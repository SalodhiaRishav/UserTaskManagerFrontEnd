<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <span class="navbar-brand">Task Manger</span>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li
            class="navitem"
            v-for="(currentLink, index) in headerLinkItems"
            :key="index"
          >
            <a class="nav-link" @click="changeRoute(currentLink.linkRoute)">{{
              currentLink.displayName
            }}</a>
          </li>
          <li class="nav-item" v-if="isLogined">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { headerLinks } from "@/mockdata/headerLinks";

export default {
  computed: {
    isLogined() {
      return this.$store.getters.loginStatus;
    },
    headerLinkItems() {
      if (this.isLogined === true) {
        return headerLinks.filter(function(headerLink) {
          return headerLink.displayAfterLogin === true;
        });
      } else {
        return headerLinks.filter(function(headerLink) {
          return headerLink.displayAfterLogin === false;
        });
      }
    }
  },
  methods: {
    changeRoute(routeToPush) {
      this.$router.push(routeToPush);
    },
    logout() {
      this.$store.dispatch("changeLoginStatus", false);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
@import "./../styles/HeaderStyle.css";
</style>
