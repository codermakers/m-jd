import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@css/reset.scss";
import "@js/htmlFontSize.js";
import "@js/filters.js";
// import "@js/axiosConfig.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
