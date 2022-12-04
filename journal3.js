#!/usr/bin/env node

import * as dotenv from "dotenv";
dotenv.config();

import { Command } from "commander";
import inquirer from "inquirer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const program = new Command();

const DATA_SCIENTIST = "Data Scientist";
const RECRUITER = "Recruiter";
const DATA_VALIDATOR = "Data Validator";
const NFT_CREATOR = "NFT Creator";

const SUBMIT_POW_TEXT = "Submit Proof of Work (PoW)";
const FETCH_RESUME_TEXT = "Fetch Resume";
const LIST_JOBS_TEXT = "List available jobs";
const APPLY_TO_JOB_TEXT = "Apply to job";

const KAGGLE_TEXT = "Kaggle";
const GOOGLE_COLAB_TEXT = "Google Colab <coming soon>";
const USE_SCHOLAR_TEXT = "UseScholar.org <coming soon>";
const DESCI_NODES_TEXT = "DeSci Nodes <coming soon>";

const LIST_SCIENTISTS_PROFILE_TEXT = "List Scientist Profiles";
const STAKE_TEXT = "Stake $JOU on Scientist";
const UNSTAKE_TEXT = "Unstake $JOU from Scientist";
const REDEEM_REWARDS_TEXT = "Redeem rewards earned from a Scientist";

const LIST_JOB_LISTINGS_TEXT = "List all your job listings";
const SHOW_JOB_LISTING_DETAILS_TEXT = "Show particular job listing details";
const PUBLISH_JOB_LISTING_TEXT = "Publish job listing";
const CREATE_JOB_LISTING_TEXT = "Create job listing";

const CREATE_NFT_STANDARD_TEXT = "Create NFT Standard for skills";
const WITHDRAW_ROYALITIES_TEXT = "Withdraw royalties for skill validation";
const LIST_ALL_CREATED_STANDARDS_TEXT = "List all created skill NFTs";

const fetchUserDataFromKaggle = async (username) => {
  console.log(
    `Imported Kaggle notebooks for ${username}. Uploaded to IPFS.
     Datasets and Competition history data will be added later.."
  `
  );

  const form = new FormData();
  const file = fs.readFileSync("./notebooks.zip");
  form.append("file", file, "notebooks.zip");
  form.append("userAddress", "0x83a1BB0A32B2c03877757a7eD7E9F18C8fbDa7eA");

  const response = await axios.post(
    process.env.API_ADDRESS + "/upload-kaggle-notebooks",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );
};

const handleKagglePoWSubmission = async () => {
  const kaggleUser = await inquirer.prompt({
    name: "username",
    type: "input",
    message: "Enter Kaggle username:",
  });

  console.log();

  fetchUserDataFromKaggle(kaggleUser.username);
};

const handlePoWSubmission = async () => {
  const powAction = await inquirer.prompt({
    name: "method",
    type: "list",
    message: "How would you like to submit your PoW \n",
    choices: [
      KAGGLE_TEXT,
      GOOGLE_COLAB_TEXT,
      USE_SCHOLAR_TEXT,
      DESCI_NODES_TEXT,
    ],
  });

  switch (powAction.method) {
    case KAGGLE_TEXT:
      await handleKagglePoWSubmission();
      break;

    default:
      console.log(
        "This has not been implemented yet. We are shipping it in our next release. Thanks for your patience!"
      );
      break;
  }
};

const fetchScientistResume = async () => {
  console.log("Fetching user's live resume from the blockchain..");

  const resume = [
    {
      "NFT Contract Address": "0x73d028BA4F68fB3A81E03a08Cd353E423C23316D",
      "NFT Issuer (address / ENS Name)": "TensorFlowAcademy.eth",
      Skills: "TensorFlow",
      "Last updated": "21th Nov, 2022",
      "Number of usage in applications": 7,
    },
    {
      "NFT Contract Address": "0xf13C9DB82d530A1fB686e681229f4ACD96deD210",
      "NFT Issuer (address / ENS Name)":
        "0xb8E3a6ae10602f8265af9d333c0A603aCa740d07",
      Skills: "Pytorch",
      "Last updated": "27th Nov, 2022",
      "Number of usage in applications": 2,
    },
    {
      "NFT Contract Address": "0x460271ea0A1DD9bB9552F348479440970d08adEf",
      "NFT Issuer (address / ENS Name)":
        "0xb8E3a6ae10602f8265af9d333c0A603aCa740d07",
      Skills: "Code Quality",
      "Last updated": "30th Nov, 2022",
      "Number of usage in applications": 10,
    },
  ];

  console.table(resume);
};

const fetchAllJobs = async () => {
  console.log("Fetching all open jobs..");

  const jobs = [
    {
      "Job Creator (address / ENS Name)":
        "0x73d028BA4F68fB3A81E03a08Cd353E423C23316D",
      "Job Title": "Data Scientist",
      "Salary Range": "100k USD - 150k USD",
      "Job Created at": "21th Nov, 2022",
      "Decision Tree": "http://localhost:8080/0",
    },
    {
      "Job Creator (address / ENS Name)": "OpenMinded.eth",
      "Job Title": "ML Researcher - Data Privacy",
      "Salary Range": "150k USD - 200k USD",
      "Job Created at": "24th Nov, 2022",
      "Decision Tree": "http://localhost:8080/1",
    },
    {
      "Job Creator (address / ENS Name)": "CommaAI.eth",
      "Job Title": "ML Engineer",
      "Salary Range": "150k USD - 200k USD",
      "Job Created at": "28th Nov, 2022",
      "Decision Tree": "http://localhost:8080/2",
    },
  ];

  console.table(jobs);
};

const handleJobApplication = async () => {
  const jobApplicationId = await inquirer.prompt({
    name: "id",
    type: "input",
    message: "Enter Job Id:",
  });

  console.log(
    `Applying to job with id ${jobApplicationId.id} with wallet 0x73d028BA4F68fB3A81E03a08Cd353E423C23316D`
  );

  console.log();

  var data = JSON.stringify({
    jobId: jobApplicationId.id,
  });

  const response = await axios.post(process.env.API_ADDRESS + "/apply-job", {
    data: data,
  });
};

const handleScientist = async () => {
  const scientistAction = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What do you want to do? \n",
    choices: [
      SUBMIT_POW_TEXT,
      FETCH_RESUME_TEXT,
      LIST_JOBS_TEXT,
      APPLY_TO_JOB_TEXT,
    ],
  });

  switch (scientistAction.action) {
    case SUBMIT_POW_TEXT:
      await handlePoWSubmission();
      break;
    case FETCH_RESUME_TEXT:
      await fetchScientistResume();
      break;
    case LIST_JOBS_TEXT:
      await fetchAllJobs();
      break;
    case APPLY_TO_JOB_TEXT:
      await handleJobApplication();
      break;
    default:
      break;
  }
};

const fetchAllJobListings = async () => {
  console.log("Fetching all your job listings");

  const jobListings = [
    {
      "Job Title": "Data Scientist",
      "Job Published at": "21th Nov, 2022",
      "Decision Tree": "http://localhost:8080/0",
      "$JOU Staked": "5000 $JOU",
    },
    {
      "Job Title": "ML Researcher - Data Privacy",
      "Job Published at": "24th Nov, 2022",
      "Decision Tree": "http://localhost:8080/1",
      "$JOU Staked": "1230 $JOU",
    },
    {
      "Job Title": "ML Engineer",
      "Job Published at": "28th Nov, 2022",
      "Decision Tree": "http://localhost:8080/2",
      "$JOU Staked": "3200 $JOU",
    },
  ];

  console.table(jobListings);
};

const fetchJobListingDetails = async () => {
  const jobListingInput = await inquirer.prompt({
    name: "id",
    type: "input",
    message: "Enter Job Listing id:",
  });

  const jobListing = [
    {
      "Job Title": "Data Scientist",
      Salary: "100-150k USD",
      "Job Published at": "21th Nov, 2022",
      "Decision Tree": "http://localhost:8080/0",
      "$JOU Staked": "5000 $JOU",
      "Shortlisted Profiles": {
        "Candidate wallet": "0x75a5cbbd475D669ea159F7533FB204B634B0502c",
        Score: "91.67% Match",
      },
    },
  ];

  console.table(jobListing);
};

const publishJobListing = async () => {
  const publishInfo = await inquirer.prompt([
    {
      name: "jobListingId",
      type: "input",
      message: "Enter Job listing id to be published:",
    },
    {
      name: "amount",
      type: "input",
      message: "Enter amount to be staked ($JOU):",
    },
  ]);

  console.log(
    `Published job listing with id ${publishInfo.jobListingId} by staking ${publishInfo.amount} $JOU on it!`
  );
};

const createJobListing = async () => {
  const createJobListingInfo = await inquirer.prompt([
    {
      name: "filename",
      type: "input",
      message: "Enter filename of Job listing spec in JSON:",
    },
  ]);

  const form = new FormData();
  const file = fs.readFileSync("./job-spec.json");
  form.append("file", file, "job-spec.json");
  form.append("userAddress", "0x83a1BB0A32B2c03877757a7eD7E9F18C8fbDa7eA");

  const response = await axios.post(
    process.env.API_ADDRESS + "/create-job",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );

  console.log(
    `Loaded Job listing spec ${createJobListingInfo.filename}. Job listing created! Publish it by staking on it..`
  );
};
const handleRecruiter = async () => {
  const recruiterAction = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What do you want to do? \n",
    choices: [
      LIST_JOB_LISTINGS_TEXT,
      SHOW_JOB_LISTING_DETAILS_TEXT,
      PUBLISH_JOB_LISTING_TEXT,
      CREATE_JOB_LISTING_TEXT,
    ],
  });

  switch (recruiterAction.action) {
    case LIST_JOB_LISTINGS_TEXT:
      await fetchAllJobListings();
      break;
    case SHOW_JOB_LISTING_DETAILS_TEXT:
      await fetchJobListingDetails();
      break;
    case PUBLISH_JOB_LISTING_TEXT:
      await publishJobListing();
      break;
    case CREATE_JOB_LISTING_TEXT:
      await createJobListing();
      break;
    default:
      break;
  }
};

const listScientistProfiles = async () => {
  console.log("Showing profiles of all scientists: ");

  const scientistProfiles = [
    {
      "Scientist Oracle Contract Link":
        "0x73d028BA4F68fB3A81E03a08Cd353E423C23316D",
      "Papers published": 4,
      "Notebooks added": 10,
      "Datasets added": 3,
      "h-index": 2,
      "Total $JOU staked": "140 $JOU",
    },
    {
      "Scientist Oracle Contract Link":
        "0x83342cB15176cd61cb0b90a391769066fC5dB2C4",
      "Papers published": 18,
      "Notebooks added": 34,
      "Datasets added": 11,
      "h-index": 14,
      "Total $JOU staked": "4450 $JOU",
    },
    {
      "Scientist Oracle Contract Link":
        "0x75a5cbbd475D669ea159F7533FB204B634B0502c",
      "Papers published": 8,
      "Notebooks added": 22,
      "Datasets added": 4,
      "h-index": 5,
      "Total $JOU staked": "870 $JOU",
    },
  ];

  console.table(scientistProfiles);
};

const stakeOnScientists = async () => {
  const stakeInput = await inquirer.prompt([
    {
      name: "validator",
      type: "list",
      message: "Choose validator \n",
      choices: [
        "Code runs correctly and passes quality standards",
        "Alpha Generator <coming soon>",
        "Public Goods Creator <coming soon>",
        "Emerging Talent <coming soon>",
        "Custom Validator <coming soon>",
      ],
    },
    {
      name: "amount",
      type: "input",
      message: "Enter total amount to stake ($JOU):",
    },
  ]);

  console.log(
    `Using ${stakeInput.validator} to stake ${stakeInput.amount} ...`
  );

  console.log("Staking completed!");

  console.log("Expected Rewards = 12%, Timeline = 18 months");

  console.log("Staking information: ");

  const postStakeDistribution = [
    {
      "Scientist Oracle Contract Link":
        "0x73d028BA4F68fB3A81E03a08Cd353E423C23316D",
      "$JOU staked": "47 $JOU",
    },
    {
      "Scientist Oracle Contract Link":
        "0x83342cB15176cd61cb0b90a391769066fC5dB2C4",
      "$JOU staked": "387 $JOU",
    },
    {
      "Scientist Oracle Contract Link":
        "0x75a5cbbd475D669ea159F7533FB204B634B0502c",
      "$JOU staked": "66 $JOU",
    },
  ];

  console.table(postStakeDistribution);
};

const unstakeFromScientists = async () => {
  const unstakeInput = await inquirer.prompt({
    name: "contractLink",
    type: "input",
    message: "Enter Scientist Oracle contract link to unstake from:",
  });

  console.log("Unstaked!");
};

const redeemRewards = async () => {
  console.log("Current reward information: ");

  const rewardDistribution = [
    {
      "Scientist Oracle Contract Link":
        "0x73d028BA4F68fB3A81E03a08Cd353E423C23316D",
      "$JOU rewards earned": "15 $JOU",
    },
    {
      "Scientist Oracle Contract Link":
        "0x83342cB15176cd61cb0b90a391769066fC5dB2C4",
      "$JOU rewards earned": "67 $JOU",
    },
    {
      "Scientist Oracle Contract Link":
        "0x75a5cbbd475D669ea159F7533FB204B634B0502c",
      "$JOU rewards earned": "19 $JOU",
    },
  ];

  console.table(rewardDistribution);

  const redeemInput = await inquirer.prompt({
    name: "contractLink",
    type: "input",
    message: "Enter Scientist Oracle contract link to redeem reward from:",
  });

  console.log("Successfully redeemed rewards for scientist!");
};
const handleValidator = async () => {
  const validatorAction = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What do you want to do? \n",
    choices: [
      LIST_SCIENTISTS_PROFILE_TEXT,
      STAKE_TEXT,
      UNSTAKE_TEXT,
      REDEEM_REWARDS_TEXT,
    ],
  });

  switch (validatorAction.action) {
    case LIST_SCIENTISTS_PROFILE_TEXT:
      await listScientistProfiles();
      break;
    case STAKE_TEXT:
      await stakeOnScientists();
      break;
    case UNSTAKE_TEXT:
      await unstakeFromScientists();
      break;
    case REDEEM_REWARDS_TEXT:
      await redeemRewards();
      break;
    default:
      break;
  }
};

const createNFTStandard = async () => {
  const nftStandardInput = await inquirer.prompt({
    name: "filename",
    type: "input",
    message: "Enter filename of NFT Standard spec (JSON):",
  });

  const form = new FormData();
  const file = fs.readFileSync("./skill-nft-standard.json");
  form.append("file", file, "skill-nft-standard.json");

  const response = await axios.post(
    process.env.API_ADDRESS + "/create-skill",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );
  console.log(`Created NFT standard for ${nftStandardInput.filename}!`);
};

const withdrawRoyaltiesOnNFTs = async () => {
  const createdNFTStandards = [
    {
      "NFT Standard Address": "0x73d028BA4F68fB3A81E03a08Cd353E423C23316D",
      "$JOU royalties earned": "100 $JOU",
    },
    {
      "NFT Standard Address": "0x83342cB15176cd61cb0b90a391769066fC5dB2C4",
      "$JOU royalties earned": "500 $JOU",
    },
    {
      "NFT Standard Address": "0x75a5cbbd475D669ea159F7533FB204B634B0502c",
      "$JOU royalties earned": "340 $JOU",
    },
  ];

  console.table(createdNFTStandards);

  const withdrawInput = await inquirer.prompt({
    name: "id",
    type: "input",
    message: "Enter id of NFT Standard spec to withdraw royalties from:",
  });

  console.log(
    `Withdrew NFT standard royalities for NFT Standard with id ${withdrawInput.id}!`
  );
};

const listAllCreatedNFTStandards = async () => {
  const nftStandardsList = [
    {
      "NFT Standard Address": "0x73d028BA4F68fB3A81E03a08Cd353E423C23316D",
      "$JOU royalties earned": "100 $JOU",
      "Number of mints": 892,
      "Number of times used in Job Listing creation": 21,
    },
    {
      "NFT Standard Address": "0x83342cB15176cd61cb0b90a391769066fC5dB2C4",
      "$JOU royalties earned": "500 $JOU",
      "Number of mints": 5980,
      "Number of times used in Job Listing creation": 48,
    },
    {
      "NFT Standard Address": "0x75a5cbbd475D669ea159F7533FB204B634B0502c",
      "$JOU royalties earned": "340 $JOU",
      "Number of mints": 2440,
      "Number of times used in Job Listing creation": 10,
    },
  ];

  console.table(nftStandardsList);
};

const handleNFTCreator = async () => {
  const nftCreatorAction = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What do you want to do? \n",
    choices: [
      CREATE_NFT_STANDARD_TEXT,
      WITHDRAW_ROYALITIES_TEXT,
      LIST_ALL_CREATED_STANDARDS_TEXT,
    ],
  });

  switch (nftCreatorAction.action) {
    case CREATE_NFT_STANDARD_TEXT:
      await createNFTStandard();
      break;
    case WITHDRAW_ROYALITIES_TEXT:
      await withdrawRoyaltiesOnNFTs();
      break;
    case LIST_ALL_CREATED_STANDARDS_TEXT:
      await listAllCreatedNFTStandards();
      break;
    default:
      break;
  }
};

program
  .name("journal3")
  .description("CLI to interact with Journal3 protocol")
  .version("0.0.1");

program
  .command("faucet")
  .description("Transfers amount number of $JOU tokens to the user's wallet")
  .argument("[amount]", "amount of $JOU tokens required", 5000)
  .action(async (amount) => {
    const amountInWei = amount + "000000000000000000";

    await axios.post(process.env.API_ADDRESS + "/faucet", {
      userAddress: process.env.PUB_KEY,
      amount: amountInWei,
    });

    console.log(
      `${amount} $JOU tokens transferred to user's wallet with address ${process.env.PUB_KEY}! `
    );
  });

program
  .command("start")
  .description("Start the main app")
  .action(async () => {
    console.log("App started...");
    const rolePrompt = await inquirer.prompt({
      name: "role",
      type: "list",
      message: "Which of these best describes you? \n",
      choices: [DATA_SCIENTIST, RECRUITER, DATA_VALIDATOR, NFT_CREATOR],
    });

    switch (rolePrompt.role) {
      case DATA_SCIENTIST:
        await handleScientist();
        break;
      case RECRUITER:
        await handleRecruiter();
        break;
      case DATA_VALIDATOR:
        await handleValidator();
        break;
      case NFT_CREATOR:
        await handleNFTCreator();
        break;

      default:
        console.log("ERROR: This should not happen");
    }
  });

program.parse();
