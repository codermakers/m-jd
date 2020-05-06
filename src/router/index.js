import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@v/Main.vue")
  },
  {
    path: "/goodslist",
    name: "GoodsList",
    component: () => import("@v/GoodsList/GoodsList.vue")
  },
  {
    path: "/goodsDetail",
    name: "GoodsDetail",
    component: () => import("@v/GoodsDetail.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
