<script lang="ts" setup>
import HeaderCard from "~/components/HeaderCard.vue";
import { useRouter } from "vue-router";

import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
import { useDAOFactoryContract, useTokenContract } from "~/utils/useContract";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../../store/web3Store";
import { reactive } from "vue";
const { address, chainId } = storeToRefs(useWeb3Store());

const tokenInfo = reactive({
  address: "",
  name: "",
});
const DAOInfo = reactive({
  name: "",
});
const router = useRouter();

async function createDAO() {
  const DAOFactoryContract = useDAOFactoryContract();
  console.log(tokenInfo.address, DAOInfo.name);
  try {
    if (DAOFactoryContract) {
      const TokenContract = useTokenContract(tokenInfo.address);
      tokenInfo.name = await TokenContract.name();
      const result = await DAOFactoryContract.createDao(
        DAOInfo.name,
        tokenInfo.address,
        tokenInfo.name,
      );
      result.wait(1).then(() => {
        console.log("Done");
        alert("Created token");
        router.push("/create/dao");
      });
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
</script>

<template>
  <div>
    <HeaderCard>
      <h1 class="text-7xl font-bold">Create a DAO</h1>
    </HeaderCard>

    <div class="p-10">
      <form @submit.prevent="">
        <router-link to="/create/token">
          <PrimaryButton> Create a token </PrimaryButton>
        </router-link>
        <p class="inline-block ml-3">OR</p>
        <input
          class="space-x-2 ml-3"
          type="text"
          v-model="tokenInfo.address"
          placeholder="Token address"
        />
        <br />
        <input
          class="mt-3 space-x-2"
          type="text"
          v-model="DAOInfo.name"
          placeholder="Name"
        />
        <div class="mt-3 space-x-2">
          <PrimaryButton type="button" @click="createDAO">
            Create DAO
          </PrimaryButton>
          <SecondaryButton type="reset">Reset</SecondaryButton>
        </div>
      </form>
    </div>
  </div>
</template>
