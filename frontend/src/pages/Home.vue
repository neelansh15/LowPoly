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
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const DAOFactoryContract = useDAOFactoryContract(true);
  // const startBlock = (await DAOFactoryContract.startBlock()).toString();
  // console.log("startBlock", startBlock);
  const filters = DAOFactoryContract.filters.NewDao();
  console.log(filters);
  const logs = await DAOFactoryContract.queryFilter(filters);
  const events = logs.map(log => DAOFactoryContract.interface.parseLog(log));
  console.log("GOT EVENTS");
  console.log(events);
  daos.value = await Promise.all(
    events.map(async (event: any) => {
      let obj = {
        name: "",
        token: "",
        address: "",
      };
      let address = event.args._daoAddress;
      const DAOContract = useDAOContract(address, true);
      obj.address = address;
      obj.name = await DAOContract.name();
      console.log(obj.name);
      await new Promise(r => setTimeout(r, 500));
      obj.token = await DAOContract.tokenName();

      console.log("daos obj", obj);

      return obj;
    }),
  );
  loading.value = false;
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

    <div v-if="loading" class="px-6 py-2">Loading...</div>

    <div v-else class="mx-3 mt-8">
      <h2 class="mx-3 text-2xl font-bold">Latest DAOs</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
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
  </div>
</template>
