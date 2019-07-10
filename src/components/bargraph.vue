<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data: () => ({
    userTasks: null,
    categories: null,
    chartdata: null,
    options: {
      title: {
        display: true,
        text: "Total Tasks Per Domain",
        fontSize: 20,
        position: "bottom"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      maintainAspectRatio: false
    }
  }),
  mounted() {
    //TODO directly from store
    this.$store
      .dispatch("getTaskCategories")
      .then(response => {
        if (response.isTaskCategoriesFetched === true) {
          const tempCategories = [];
          this.$store.getters.taskCategories.forEach(category => {
            tempCategories.push(category.categoryName);
          });
          this.categories = tempCategories;
        } else {
          alert(response.error);
        }
      })
      .catch(error => {
        alert(error.error);
      });
    this.drawBarGraph();
  },
  methods: {
    drawBarGraph() {
      const userId = sessionStorage.getItem("id");
      this.$store
        .dispatch("setUserTasks", userId)
        .then(response => {
          if (response.dataFetched === true) {
            const userTaskArray = this.$store.getters.userTasks;
            const categoryCount = [];
            this.categories.forEach(function(category) {
              const count = userTaskArray.filter(
                task => task.taskCategory.categoryName === category
              ).length;
              categoryCount.push(count);
            });
            let chartData = {
              labels: this.categories,
              datasets: [
                {
                  label: "Categories Data",
                  backgroundColor: "#f87979",
                  data: categoryCount
                }
              ]
            };
            this.chartdata = chartData;
            this.renderChart(this.chartdata, this.options);
          } else {
            alert(response.error);
          }
        })
        .catch(error => {
          alert(error.error);
        });
    }
  }
};
</script>
