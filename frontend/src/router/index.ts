import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";

const routes = [
  {
    component: Home,
    path: "/",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
