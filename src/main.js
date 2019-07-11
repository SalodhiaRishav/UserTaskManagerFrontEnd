import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import { routes } from "@/routes";
import store from "@/store/store";
import VeeValidate from "vee-validate";

Vue.use(VueRouter);
Vue.use(VeeValidate);

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.fullPath !== "/login" && to.fullPath !== "register") {
    const isUserLogined = store.getters.loginStatus;
    if (!isUserLogined) {
      next("/login");
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
