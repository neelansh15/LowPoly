<script lang="ts" setup>
import HeaderCard from "~/components/HeaderCard.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
</script>

<template>
  <div>
    <HeaderCard>
      <h1 class="text-7xl font-bold">Create a Token</h1>
    </HeaderCard>

    <div class="p-10">
      <form @submit.prevent="">
        <input class="ml-3" type="text" placeholder="Name" />
        <input class="ml-3" type="text" placeholder="Symbol" />
        <input class="ml-3" type="text" placeholder="Supply amount" />
        <div class="mt-4 ml-3 space-x-2">
          <PrimaryButton>Create Token</PrimaryButton>
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
