<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import HeaderCard from "~/components/HeaderCard.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
import { useTokenFactoryContract } from "~/utils/useContract";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../../store/web3Store";
const { address, chainId } = storeToRefs(useWeb3Store());

const tokenInfo = reactive({
  name: "",
  symbol: "",
  totalSupply: "",
});

async function createToken() {
  const tokenFactoryContract = useTokenFactoryContract();
  try {
    if (tokenFactoryContract) {
      const result = await tokenFactoryContract.createToken(
        tokenInfo.name,
        tokenInfo.symbol,
        tokenInfo.totalSupply,
      );
      result.wait(1).then(() => {
        console.log("Done");
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
      <h1 class="text-7xl font-bold">Create a Token</h1>
    </HeaderCard>

    <div class="p-10">
      <form @submit.prevent="">
        <input
          class="ml-3"
          type="text"
          v-model="tokenInfo.name"
          placeholder="Name"
        />
        <input
          class="ml-3"
          type="text"
          v-model="tokenInfo.symbol"
          placeholder="Symbol"
        />
        <input
          class="ml-3"
          type="text"
          v-model="tokenInfo.totalSupply"
          placeholder="Supply amount"
        />
        <div class="mt-4 ml-3 space-x-2">
          <PrimaryButton type="button" @click="createToken"
            >Create Token</PrimaryButton
          >
          <SecondaryButton type="reset">Reset</SecondaryButton>
          <p class="mt-3 text-gray-500">
            Already have a token?
            <router-link to="/create/dao"> Create a DAO </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
