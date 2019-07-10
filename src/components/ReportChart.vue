<template>
  <div>
    <div class="row">
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
  }
};
</script>
