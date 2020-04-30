import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@v/Home.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@v/Cart.vue")
  },
  {
    path: "/me",
    name: "Me",
    component: () => import("@v/Me.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
