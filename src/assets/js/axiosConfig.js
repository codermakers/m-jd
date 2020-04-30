// axios 配置

import Vue from "vue";
import axios from "axios";

// 设置 axios 请求 的baseUrl
axios.defaults.baseURL = "http://api.imooc.hybrid.lgdsunday.club";

// 设置请求接口中 的 token
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = "62c12810-12c3-11ea-acd3-7b90f1eac841";
  } else {
    config.params = {
      token: "62c12810-12c3-11ea-acd3-7b90f1eac841"
    };
  }
  return config;
});

/*
 * 设置拦截器， interceptors 响应处理
 * 所有使用 axios 的请求响应，都会优先回调到拦截器中,
 * 请求正确时会进入 response的回调方法中，发生错误时则会返回error方法中
 * */

axios.interceptors.response.use(
  response => {
    // 统一处理数据
    return response.data.data;
  },
  error => {
    // 处理错误请求
    return Promise.reject(error);
  }
);

// 绑定 axios 到 vue的 原型中，这样就可以通过 this.$http 调用axios
Vue.prototype.$http = axios;
