<script>
import { Line, Bar } from "vue-chartjs";

export default {
  extends: Bar,
  Line,
  data: () => ({
    userTasks: null,
    categories: null,
    chartData: null,
    options: {
      title: {
        fontSize: 20,
        position: "bottom",
        display: true,
        text: "Expected Time vs Spent Time"
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
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted() {
    this.$store
      .dispatch("getTaskCategories")
      .then(response => {
        if (response.isTaskCategoriesFetched === true) {
          const tempCategories = [];
          const taskCategories = this.$store.getters.taskCategories;
          for (let index = 0; index < taskCategories.length; ++index) {
            tempCategories.push(taskCategories[index].categoryName);
          }
          this.categories = tempCategories;
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error);
      }),
      this.drawLineGraph();
  },
  methods: {
    drawLineGraph() {
      const userId = this.$store.getters.loginedUser.id;
      this.$store
        .dispatch("setUserTasks", userId)
        .then(response => {
          if (response.isUserTasksFetched === true) {
            this.userTasks = this.$store.getters.userTasks;
            const expectedTimeArray = [];
            const timeSpentArray = [];
            for (let i = 0; i < this.categories.length; ++i) {
              const tasks = this.userTasks.filter(
                task => task.taskCategory.categoryName === this.categories[i]
              );
              let expectedTimeCount = 0;
              let timeSpentCount = 0;
              for (let j = 0; j < tasks.length; ++j) {
                timeSpentCount += tasks[j].timeSpent;
                expectedTimeCount += tasks[j].expectedTime;
              }
              expectedTimeArray.push(expectedTimeCount);
              timeSpentArray.push(timeSpentCount);
            }
            const dataChart = {
              labels: this.categories,
              datasets: [
                {
                  label: "Expected Time",
                  type: "line",
                  data: expectedTimeArray,
                  borderColor: "#ff0000",
                  borderWidth: 3
                },
                {
                  label: "Time Spent",
                  type: "bar",
                  data: timeSpentArray,
                  borderColor: "#36495d",
                  borderWidth: 3
                }
              ]
            };
            this.renderChart(dataChart, this.options);
          } else {
            alert(response.error);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
