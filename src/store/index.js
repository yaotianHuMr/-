import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menulist: JSON.parse(sessionStorage.getItem("menulist") || "[]"),
    userData: JSON.parse(sessionStorage.getItem("userData")) || ''
  },
  mutations: {
    setmenulist(state, data) {
      state.menulistes = data;
      sessionStorage.setItem("menulist", JSON.stringify(data));
    },
    setuser(state, data) {
      state.userData = data;
      sessionStorage.setItem("userData", JSON.stringify(data));
    }
  },
  actions: {},
  modules: {}
});
