import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import CreateDAO from '../pages/create/CreateDAO.vue'

const routes = [
  {
    component: Home,
    path: "/",
  },
  {
    component: CreateDAO,
    path: "/create",
  },
  {
    component: CreateDAO,
    path: "/create/dao",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
