import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Meta from "vue-meta";

Vue.use(Meta);
Vue.use(VueRouter);

const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/signout",
    name: "Signout",
    component: () => import("../views/Signout.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/403",
    name: "403",
    component: () => import("../views/403.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.signin) {
      next({
        path: "/signin",
        query: {
          redirect: to.fullPath,
          message: true,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
