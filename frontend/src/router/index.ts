import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import CreateDAO from "../pages/create/CreateDAO.vue";
import CreateToken from "../pages/create/CreateToken.vue";
import ManageDAO from "../pages/ManageDAO.vue";

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
  {
    component: CreateToken,
    path: "/create/token",
  },
  {
    component: ManageDAO,
    path: "/dao/manage",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
