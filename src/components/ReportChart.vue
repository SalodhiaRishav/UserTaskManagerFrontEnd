<template>
  <div>
    <div v-if="!isUserTasksAvailable">
      user tasks are empty..
    </div>
    <div class="row" v-if="isUserTasksAvailable">
      <div class="col" style="text-align:center">
        <app-bargraph></app-bargraph>
      </div>
      <div class="col">
        <app-Linegraph></app-Linegraph>
      </div>
    </div>
  </div>
</template>

<script>
import bargraph from "@/components/bargraph.vue";
import LineGraph from "@/components/LineGraph.vue";

export default {
  components: {
    appBargraph: bargraph,
    appLinegraph: LineGraph
  },
  computed: {
    isUserTasksAvailable() {
      if (this.$store.getters.userTasks === null) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
