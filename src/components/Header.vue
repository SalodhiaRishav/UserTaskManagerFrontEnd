<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <span class="navbar-brand">Task Manger</span>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link
            v-for="(currentLink, index) in headerLinkItems"
            :to="currentLink.linkRoute"
            activeClass="active"
            class="nav-item"
            tag="li"
            :key="index"
          >
            <a class="nav-link">{{ currentLink.displayName }}</a>
          </router-link>
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
      const headerLinkItems = [];
      if (this.isLogined === true) {
        headerLinks.forEach(headerLink => {
          if (headerLink.displayAfterLogin === true) {
            headerLinkItems.push(headerLink);
          }
        });
        return headerLinkItems;
      } else {
        headerLinks.forEach(headerLink => {
          if (headerLink.displayAfterLogin === false) {
            headerLinkItems.push(headerLink);
          }
        });
        return headerLinkItems;
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("changeLoginStatus", false);
      sessionStorage.removeItem("id");
      this.$router.push("/login");
    }
  }
};
</script>
