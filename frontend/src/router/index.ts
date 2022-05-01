import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import CreateDAO from "../pages/create/CreateDAO.vue";
import CreateToken from "../pages/create/CreateToken.vue";
import CreateProposal from "../pages/create/CreateProposal.vue";
import ManageDAO from "../pages/ManageDAO.vue";
import DAO from "../pages/DAO.vue";

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
    component: CreateProposal,
    path: "/create/proposal",
  },
  {
    component: ManageDAO,
    path: "/dao/manage",
  },
  {
    component: DAO,
    path: "/dao/:address",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
