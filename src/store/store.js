import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import task from "@/store/modules/task";
import taskcategory from "@/store/modules/taskcategory";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    task,
    taskcategory
  }
});
