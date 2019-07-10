<template>
  <div>
    <form>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="category">Task Domain</label>
          <select v-model="task.taskCategoryId" id="category">
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
              >{{ category.categoryName }}</option
            >
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="userStory">User Story</label>
          <input
            type="text"
            class="form-control"
            id="userStory"
            required
            v-model="task.userStory"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="timeSpent">Time Spent</label>
          <input
            type="number"
            class="form-control"
            id="timeSpent"
            required
            v-model="task.timeSpent"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="expectedTime">Expected Time</label>
          <input
            type="number"
            class="form-control"
            id="expectedTime"
            required
            v-model="task.expectedTime"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="taskDate">Task Date</label>
          <input
            type="date"
            class="form-control"
            id="taskDate"
            required
            v-model="task.taskDate"
          />
        </div>
      </div>
      <div class="row">
        <button
          class="col-6 btn btn-lg btn-primary btn-block"
          type="submit"
          @click.prevent="submit"
        >
          Add New Task
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: null,
      task: {
        taskDate: "",
        taskCategoryId: null,
        expectedTime: null,
        timeSpent: null,
        userId: null,
        userStory: ""
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("getTaskCategories")
      .then(response => {
        if (response.isTaskCategoriesFetched === true) {
          this.categories = this.$store.getters.taskCategories;
        } else {
          alert(response.message);
        }
      })
      .catch(error => {
        alert(error);
      });
  },
  methods: {
    clearTask() {
      (this.task.taskDate = ""),
        (this.task.taskCategoryId = null),
        (this.task.expectedTime = null),
        (this.task.timeSpent = null),
        (this.task.userStory = "");
    },
    submit() {
      const userId =this.$store.getters.loginedUser.id;
      if (userId === null) {
        alert("please login first");
        return;
      } else {
        this.task.userId = userId;
        this.$store
          .dispatch("postNewTask", {Task:posttask})
          .then(response => {
            if (response.isTaskAddedSuccessfully === true) {
              this.clearTask();
            } else {
              alert(response.message);
            }
          })
          .catch(error => {
            alert(error);
          });
      }
    }
  }
};
</script>
