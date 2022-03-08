import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";
import store from "./store";
import InfiniteLoading from "vue-infinite-loading";

axios.defaults.baseURL = "http://35.77.161.108:3000/api/";
axios.defaults.headers.common = {
  apikey: store.getters.getUserData ? store.getters.getUserData.apikey : null,
};

window.addEventListener("unhandledrejection", function(event) {
  if (event.reason.response.status == 403) {
    window.location.href = "/403";
  }
});

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(InfiniteLoading);

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
