<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";

import HeaderCard from "~/components/HeaderCard.vue";
import { useTokenFactoryContract, useTokenContract } from "~/utils/useContract";
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

onMounted(async () => {
  // getting details
  const tokenFactoryContract = useTokenFactoryContract(true);
  let tokenAddresses = await tokenFactoryContract.getTokensOf(address.value);
  for (let i in tokenAddresses) {
    const tokenContract = useTokenContract(tokenAddresses[i], true);
    let tokenName = await tokenContract.name();
    let balance = await tokenContract.balanceOf(address.value);
    balance = formatEther(balance.toString());
    tokens.value.push({
      name: tokenName,
      address: tokenAddresses[i],
      balance: balance,
    });
    isOpen.value.push(false);
  }
});

const token = reactive({
  address: "",
});
const delegate = reactive({
  address: "",
});
const transfer = reactive({
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
      result.wait(1, () => {
        alert("Votes have been delegated");
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
        ethers.utils.parseEther(transfer.amount),
        {
          gasLimit: 9023256,
        }
      );
      result.wait(1, () => {
        alert("Transferred tokens");
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
      <div class="p-10">
        <b>Transfer tokens</b>
        <form action="transferTokens">
          <input
            type="text"
            v-model="token.address"
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
        <b>Delegate tokens</b>
        <form action="delegateToken">
          <input
            type="text"
            v-model="token.address"
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
            @click="delegateVotes(token.address)"
          >
            Delegate
          </PrimaryButton>
        </form>
      </div>
      <h1 class="text-3xl my-3 font-bold">Tokens held by you</h1>
      <div v-for="(token, i) in tokens">
        <div class="ml-3">
          <div class="flex items-center">
            <h1 class="text-xl mt-2">
              {{ i + 1 }}. {{ token.name }}: {{ token.balance }}
            </h1>
            <button
              v-if="isOpen[i]"
              class="ml-3"
              @click="isOpen[i] = !isOpen[i]"
            >
              &uarr;
            </button>
            <button
              v-if="!isOpen[i]"
              class="ml-3"
              @click="isOpen[i] = !isOpen[i]"
            >
              &darr;
            </button>
          </div>
          <div v-if="isOpen[i]" class="p-10">
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

          <div v-if="isOpen[i]" class="p-10">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
