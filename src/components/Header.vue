<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <span class="navbar-brand">Task Manger</span>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <div v-if="!isLogined">
            <router-link
              v-for="(currentLink, index) in beforeLoginHeaderLinks"
              :to="currentLink.LinkRoute"
              activeClass="active"
              class="nav-item"
              tag="li"
              :key="index"
            >
              <a class="nav-link">{{ currentLink.DisplayName }}</a>
            </router-link>
          </div>
          <div v-if="isLogined">
            <router-link
              v-for="(currentLink, index) in afterLoginHeaderLinks"
              :to="currentLink.LinkRoute"
              activeClass="active"
              class="nav-item"
              tag="li"
              style="display:inline"
              :key="index"
            >
              <a class="nav-link">{{ currentLink.DisplayName }}</a>
            </router-link>
            <li class="nav-item">
              <a class="nav-link" style="display:inline" @click="logout"
                >LogOut</a
              >
            </li>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import {
  beforeLoginHeaderLinks,
  afterLoginHeaderLinks
} from "@/mockdata/headerLinks";

export default {
  data() {
    return {
      beforeLoginHeaderLinks: beforeLoginHeaderLinks,
      afterLoginHeaderLinks: afterLoginHeaderLinks
    };
  },
  computed: {
    isLogined() {
      return this.$store.getters.loginStatus;
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
