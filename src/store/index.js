import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);
Vue.prototype.$axios = axios;

export default new Vuex.Store({
  state: {
    userData: null,
    signin: false,
  },
  getters: {
    getUserData: (state) => {
      return state.userData;
    },
    signin: (state) => {
      return state.signin;
    },
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setSignin(state, signin) {
      state.signin = signin;
    },
  },
  plugins: [
    createPersistedState({
      key: "todo",
      storage: window.localStorage,
    }),
  ],
});
