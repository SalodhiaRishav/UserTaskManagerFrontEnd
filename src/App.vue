<template>
  <div id="app" class="container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    appHeader: Header
  }
};
</script>

<style>
@import "./styles/AppVueStyle.css";
</style>
