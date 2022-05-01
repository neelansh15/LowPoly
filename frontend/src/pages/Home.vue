<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderCard from "~/components/HeaderCard.vue";
import {
  useDAOFactoryContract,
  useDAOContract,
  useTokenContract,
} from "~/utils/useContract";
import PrimaryButton from "../components/PrimaryButton.vue";

import DAOCard from "../components/DAOCard.vue";

const daos = ref([] as any[]);

onMounted(async () => {
  const DAOFactoryContract = useDAOFactoryContract();
  const DAOAddresses = await DAOFactoryContract.getDAOs();
  daos.value = await Promise.all(
    DAOAddresses.map(async (address: string) => {
      let obj = {
        name: "",
        token: "",
        address: "",
      };
      const DAOContract = useDAOContract(address);
      obj.address = address;
      obj.name = await DAOContract.name();
      const DAOtoken = await DAOContract.token();
      const TokenContract = useTokenContract(DAOtoken);
      obj.token = await TokenContract.name();
      return obj;
    }),
  );
});
</script>

<template>
  <div class="h-full">
    <HeaderCard>
      <h1 class="font-bold text-7xl">LowPoly</h1>
      <p class="mt-2 text-gray-100">
        Transitioning organizations towards decentralization
      </p>
    </HeaderCard>

    <div class="p-10">
      <router-link to="/create/dao">
        <PrimaryButton> Create a DAO </PrimaryButton>
      </router-link>
      <router-link class="ml-3" to="/dao/manage">
        <PrimaryButton> Manage a DAO </PrimaryButton>
      </router-link>
    </div>
    <div>
      <router-link
        v-for="dao in daos"
        :key="dao.name"
        class="ml-3"
        :to="'/dao/' + dao.address"
      >
        <DAOCard>
          <template v-slot:name> {{ dao.name }} </template>
          <template v-slot:token> {{ dao.token }} </template>
        </DAOCard>
      </router-link>
    </div>
  </div>
</template>
