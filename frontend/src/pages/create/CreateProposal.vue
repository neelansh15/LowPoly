<script lang="ts" setup>
import HeaderCard from "~/components/HeaderCard.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../../store/web3Store";
import { ethers } from "ethers";
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { formatEther } from "@ethersproject/units";
import { useDAOContract, useTokenContract } from "~/utils/useContract";
import { useRouter } from "vue-router";
const router = useRouter();
const { address, web3provider } = storeToRefs(useWeb3Store());

const proposalInfo = reactive({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  startBlock: -1,
  endBlock: -1,
});
const route = useRoute();
const DAOaddress = route.params.address as string;

const account = reactive({
  balance: "",
  delegatedTo: "",
});
const DAO = reactive({
  threshold: "",
  name: "",
});

onMounted(async () => {
  const DAOContract = useDAOContract(DAOaddress, true);
  const name = await DAOContract.name();
  DAO.name = name;
  const tokenAddress = await DAOContract.token();
  const TokenContract = useTokenContract(tokenAddress, true);
  DAO.threshold = await DAOContract.proposalThreshold();
  let balance = await TokenContract.balanceOf(address.value);
  const delegatedTo = await TokenContract.delegates(address.value);
  account.delegatedTo = delegatedTo;
  account.balance = formatEther(balance.toString());
});

async function createProposal() {
  const OwnerAddress = address.value;
  const grantAmount = 0;
  const DAOContract = useDAOContract(DAOaddress);
  const tokenAddress = await DAOContract.token();
  const TokenContract = useTokenContract(tokenAddress);
  const transferCalldata = TokenContract.interface.encodeFunctionData(
    "transfer",
    [OwnerAddress, grantAmount],
  );
  console.log("CREATE PROPOSAL");
  let proposalDescription =
    proposalInfo.title + "$$" + proposalInfo.description;
  console.log(proposalDescription);
  const result = await DAOContract.propose(
    [tokenAddress],
    [0],
    [transferCalldata],
    proposalDescription,
    {
      gasLimit: 9027672,
    },
  );

  console.log("RESULT:", result);
  result.wait(1).then(() => {
    console.log("Proposal created");
    alert("Proposal created");
    router.push(`/dao/${DAOaddress}`);
  });
}

// const convertToBlockNumber = async (targetTimestamp: any) => {
//   let averageBlockTime = 2.5;
//   const provider =
//     web3provider || new ethers.providers.Web3Provider(window.ethereum);
//   if (!provider.value) {
//     console.log("No provider", provider);
//     return null;
//   }
//   console.log(provider);
//   const currentBlockNumber = await provider.value.getBlockNumber();
//   let blockNumber = currentBlockNumber;
//   let temp = parseInt(
//     blockNumber + (targetTimestamp - +new Date() / 1000) / averageBlockTime
//   );
//   return temp;
// };

// watch(
//   () => proposalInfo.startDate,
//   async (newVal, oldVal) => {
//     console.log({ newVal: newVal });
//     if (proposalInfo.endDate) {
//       if (proposalInfo.startDate > proposalInfo.endDate) {
//         alert("Invalid dates");
//         proposalInfo.startDate = null;
//         return;
//       }
//     }
//     let timeStamp = new Date(newVal).getTime() / 1000;
//     let val = await convertToBlockNumber(timeStamp);
//     console.log({ val: val });
//     if (val) {
//       proposalInfo.startBlock = val;
//     }
//   }
// );
// watch(
//   () => proposalInfo.endDate,
//   async (newVal, oldVal) => {
//     console.log({ newVal: newVal });
//     if (proposalInfo.startDate) {
//       if (proposalInfo.startDate > proposalInfo.endDate) {
//         alert("Invalid dates");
//         proposalInfo.endDate = null;
//         return;
//       }
//     }
//     let timeStamp = new Date(newVal).getTime() / 1000;
//     let val = await convertToBlockNumber(timeStamp);
//     console.log({ val: val });
//     if (val) {
//       proposalInfo.endBlock = val;
//     }
//   }
// );
</script>

<template>
  <div>
    <HeaderCard>
      <h1 class="text-7xl font-bold">Create a proposal for {{ DAO.name }}</h1>
    </HeaderCard>
    <div
      class="m-6 p-5 bg-dark-100 w-auto inline-block rounded-lg inline-flex space-x-5 items-center"
    >
      <div>
        <h5 class="text-sm">Proposal threshold</h5>
        <h2 class="text-2xl font-light">{{ DAO.threshold }}</h2>
      </div>
      <div>
        <h5 class="text-sm">Your balance</h5>
        <h2 class="text-2xl">{{ account.balance }}</h2>
      </div>
      <div>
        <h5 class="text-sm">Delegated To</h5>
        <h2 class="text-2xl">{{ account.delegatedTo }}</h2>
      </div>
    </div>
    <div
      class="mx-6 my-3 p-5 bg-dark-100 rounded-lg"
      style="width: fit-content"
    >
      <form @submit.prevent="createProposal">
        <b>Create proposal</b>
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.title"
          placeholder="Title"
          required="true"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.description"
          placeholder="Description"
          required="true"
        />
        <br />
        <!-- <label class="mr-3" for="startDate">Start date</label>
        <input
          class="mt-3 space-x-2"
          id="startDate"
          type="date"
          v-model="proposalInfo.startDate"
          placeholder="Start date dd/mm/yyyy"
          required="true"
        />
        <label class="ml-3 mr-3" for="endDate">End date</label>
        <input
          class="mt-3 ml-5 space-x-2"
          id="endDate"
          type="date"
          v-model="proposalInfo.endDate"
          placeholder="End date dd/mm/yyyy"
          required="true"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="proposalInfo.startBlock"
          placeholder="Start block"
        />
        <input
          class="mt-3 ml-5 space-x-2"
          type="text"
          v-model="proposalInfo.endBlock"
          placeholder="End block"
        /> -->

        <div class="mt-3 space-x-2">
          <PrimaryButton type="submit"> Create proposal </PrimaryButton>
          <SecondaryButton type="reset">Reset</SecondaryButton>
        </div>
      </form>
    </div>
  </div>
</template>
