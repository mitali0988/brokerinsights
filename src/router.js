import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/policies",
    name: "policies",
    component: () => import("./components/PoliciesList")
  },
  {
    path: "/policies/:id",
    name: "policy-details",
    component: () => import("./components/Policy")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddPolicy")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;