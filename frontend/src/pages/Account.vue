<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";

import HeaderCard from "~/components/HeaderCard.vue";
import {
  useTokenFactoryContract,
  useTokenContract,
  useDEXContract,
} from "~/utils/useContract";
import DEXData from "../../../abis/DEX.json";
import PrimaryButton from "~/components/PrimaryButton.vue";
import { storeToRefs } from "pinia";
import { useWeb3Store } from "../store/web3Store";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
const { address, chainId, web3provider } = storeToRefs(useWeb3Store());

const tokens = ref([] as any[]);
const isOpen = ref([] as any[]);

const dexAddress = ref(DEXData.address);

onMounted(() => {
  if (!address.value) {
    setTimeout(init, 1000);
  } else init();
});

const init = async () => {
  // getting details
  const dexContract = useDEXContract();
  const tokenFactoryContract = useTokenFactoryContract(true);
  let tokenAddresses = await tokenFactoryContract.getTokensOf(address.value);
  for (let i in tokenAddresses) {
    const tokenContract = useTokenContract(tokenAddresses[i], true);
    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    let balance = await tokenContract.balanceOf(address.value);
    balance = formatEther(balance.toString());

    const claimableEther = +formatEther(
      await dexContract.tokenEtherBalance(tokenAddresses[i]),
    );

    const dexBalance = +formatEther(
      await tokenContract.balanceOf(dexAddress.value),
    );

    tokens.value.push({
      name: tokenName,
      symbol: tokenSymbol,
      address: tokenAddresses[i],
      balance: balance,
      claimableEther,
      dexBalance,
    });
    isOpen.value.push(false);
  }
};

const delegate = reactive({
  token: "",
  address: "",
});
const transfer = reactive({
  token: "",
  address: "",
  amount: "",
});

async function delegateVotes(address: string) {
  const tokenContract = useTokenContract(address);

  try {
    if (tokenContract) {
      const result = await tokenContract.delegate(delegate.address, {
        gasLimit: 9022680,
      });
      result.wait(1).then(() => {
        alert("Votes have been delegated");
        location.reload();
      });
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
async function transferTokens(address: string) {
  const tokenContract = useTokenContract(address);
  try {
    if (tokenContract) {
      const result = await tokenContract.transfer(
        transfer.address,
        ethers.utils.parseEther(transfer.amount.toString()),
        {
          gasLimit: 9023256,
        },
      );
      result.wait(1).then(() => {
        alert("Transferred tokens");
        location.reload();
      });
    }
  } catch (e: any) {
    console.log(e.message);
  }
}

async function withdrawAll(tokenAddress: string) {
  const dexContract = useDEXContract();
  try {
    const result = await dexContract.withdrawAll(tokenAddress);

    console.log("Withdraw_All transaction", result.hash);
    result.wait(1).then(() => {
      console.log("Withdraw_All transaction completed");
    });
  } catch (e) {
    console.error("Error while withdrawing all", e);
  }
}
</script>

<template>
  <div class="pb-10">
    <HeaderCard>
      <div class="flex justify-between items-end">
        <div>
          <h1 class="text-7xl font-bold">Account</h1>
          <h2 class="mt-2 text-primary-200">{{ address }}</h2>
        </div>
        <div>
          <h4 class="text-sm font-bold">DEX Address</h4>
          <h3 class="text-sm text-primary-200">{{ dexAddress }}</h3>
        </div>
      </div>
    </HeaderCard>
    <div class="p-5">
      <div class="p-2 mb-6">
        <b>Transfer tokens</b>
        <form class="mt-1" action="transferTokens">
          <input
            type="text"
            v-model="transfer.token"
            placeholder="Token address"
          />
          <input
            class="ml-3"
            type="text"
            v-model="transfer.address"
            placeholder="Recipient address"
          />
          <input
            class="ml-3"
            type="number"
            v-model="transfer.amount"
            placeholder="Amount"
          />
          <PrimaryButton
            class="ml-3"
            type="button"
            @click="transferTokens(transfer.token)"
          >
            Transfer tokens
          </PrimaryButton>
        </form>
      </div>
      <div class="p-2 mb-6">
        <b>Delegate tokens</b>
        <form class="mt-1" action="delegateToken">
          <input
            type="text"
            v-model="delegate.token"
            placeholder="Token address"
          />
          <input
            type="text"
            class="ml-3"
            v-model="delegate.address"
            placeholder="Recipient address"
          />

          <PrimaryButton
            class="ml-3"
            type="button"
            @click="delegateVotes(delegate.token)"
          >
            Delegate
          </PrimaryButton>
        </form>
      </div>
      <h1 class="text-3xl my-3 font-bold">Tokens owned by you</h1>
      <div class="flex flex-wrap space-x-5">
        <div v-for="(token, i) in tokens">
          <div
            class="my-2"
            style="
              width: fit-content;
              transition: all 0.66s ease-out;
              overflow: hidden;
              min-height: 226px;
            "
          >
            <div
              class="bg-primary-500 py-4 px-5 flex justify-between items-center space-x-45 z-30"
              :class="isOpen[i] ? 'rounded-t-lg' : 'rounded-lg'"
            >
              <div>
                <h1 class="text-sm font-bold">{{ token.name }}</h1>
                <div class="flex items-center space-x-2 mt-1">
                  <p
                    class="text-xs bg-white text-primary-600 px-2 py-1 rounded-lg"
                  >
                    {{ token.symbol }}
                  </p>
                  <h2 class="text-xl font-light">{{ token.balance }}</h2>
                </div>
              </div>
              <div>
                <button
                  v-show="isOpen[i]"
                  class="p-3 text-xl"
                  @click="isOpen[i] = !isOpen[i]"
                >
                  &uarr;
                </button>
                <button
                  v-show="!isOpen[i]"
                  class="p-3 text-xl"
                  @click="isOpen[i] = !isOpen[i]"
                >
                  &darr;
                </button>
              </div>
            </div>
            <transition name="fadeonly" mode="out-in">
              <div
                v-show="isOpen[i]"
                class="py-4 px-5 bg-primary-700 rounded-b-lg z-20"
              >
                <div>
                  <h1 class="text-sm font-bold">Address</h1>
                  <h2 class="text-xs">{{ token.address }}</h2>
                </div>
                <div class="mt-2">
                  <h1 class="text-sm font-bold">DEX Balance</h1>
                  <h2 class="text-xs">{{ token.dexBalance }}</h2>
                </div>
                <div class="mt-2 flex justify-between items-center space-x-5">
                  <div>
                    <h1 class="text-sm font-bold">Claimable Ether</h1>
                    <h2 class="text-xl font-light">
                      {{ token.claimableEther }}
                    </h2>
                  </div>
                  <PrimaryButton @click="withdrawAll(token.address)"
                    >Withdraw all</PrimaryButton
                  >
                </div>

                <!-- <div class="p-10">
                <b>Transfer tokens</b>
                <form action="transferTokens">
                  <input
                    type="text"
                    v-model="transfer.address"
                    placeholder="Address"
                  />
                  <input
                    class="ml-3"
                    type="text"
                    v-model="transfer.amount"
                    placeholder="Amount"
                  />
                  <PrimaryButton
                    class="ml-3"
                    type="button"
                    @click="transferTokens(token.address)"
                  >
                    Transfer tokens
                  </PrimaryButton>
                </form>
              </div>

              <div class="p-10">
                <b>Delegate votes</b>
                <form>
                  <input
                    type="text"
                    v-model="delegate.address"
                    placeholder="Address"
                  />
                  <PrimaryButton
                    class="ml-3"
                    type="button"
                    @click="delegateVotes(token.address)"
                  >
                    Delegate votes
                  </PrimaryButton>
                </form>
              </div> -->
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="number"] {
  @apply text-white bg-dark-600 hover:bg-dark-500 px-3 py-2 border border-gray-400 rounded;
}
</style>
