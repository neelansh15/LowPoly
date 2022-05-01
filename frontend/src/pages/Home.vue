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
  const filters = await DAOFactoryContract.filters.NewDAO();
  const logs = await DAOFactoryContract.queryFilter(
    filters,
    26077084,
    "latest",
  );
  const events = logs.map(log => DAOFactoryContract.interface.parseLog(log));
  console.log("GOT EVENTS");
  daos.value = await Promise.all(
    events.map(async (event: any) => {
      let obj = {
        name: "",
        token: "",
        address: "",
      };
      let address = event.args._daoAddress;
      const DAOContract = useDAOContract(address);
      obj.address = address;
      obj.name = await DAOContract.name();
      const DAOtoken = await DAOContract.token();
      const TokenContract = useTokenContract(DAOtoken);
      obj.token = await TokenContract.name();
      await new Promise(r => setTimeout(r, 500));
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
      <router-link class="ml-3" to="/account">
        <PrimaryButton> Account </PrimaryButton>
      </router-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <router-link
        v-for="dao in daos"
        :key="dao.name"
        class="mx-3"
        :to="'/dao/' + dao.address"
      >
        <DAOCard class="mt-3">
          <template v-slot:name> {{ dao.name }} </template>
          <template v-slot:token> {{ dao.token }} </template>
        </DAOCard>
      </router-link>
    </div>
  </div>
</template>
