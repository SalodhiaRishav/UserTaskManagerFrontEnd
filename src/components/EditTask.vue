<template>
  <div>
    <form>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="category">Task Domain</label>
          <select
            v-validate="'required'"
            name="category"
            v-model="task.taskCategoryId"
            id="category"
          >
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
              >{{ category.categoryName }}</option
            >
          </select>
          <span class="errorMessage">{{ errors.first("category") }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="userStory">User Story</label>
          <input
            v-validate="'required|min:1|max:200'"
            type="text"
            class="form-control"
            id="userStory"
            required
            v-model="task.userStory"
            name="userStory"
          />
          <span class="errorMessage">{{ errors.first("userStory") }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="timeSpent">Time Spent</label>
          <input
            v-validate="'required|numeric|min_value:1'"
            type="number"
            class="form-control"
            id="timeSpent"
            required
            v-model="task.timeSpent"
            name="timeSpent"
          />
          <span class="errorMessage">{{ errors.first("timeSpent") }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="expectedTime">Expected Time</label>
          <input
            v-validate="'required|numeric|min_value:1'"
            type="number"
            class="form-control"
            id="expectedTime"
            required
            v-model="task.expectedTime"
            name="expectedTime"
          />
          <span class="errorMessage">{{ errors.first("expectedTime") }}</span>
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
          Edit Task
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: null
    };
  },
  mounted() {
    this.task.taskDate = this.convertDate(this.task.taskDate);
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
  computed: {
    task() {
      return this.$store.getters.taskToEdit;
    }
  },
  methods: {
    convertDate(someDate) {
      return new Date(someDate.match(/\d+/)[0] * 1)
        .toISOString()
        .substring(0, 10);
    },
    clearTask() {
      (this.task.taskDate = ""),
        (this.task.taskCategoryId = null),
        (this.task.expectedTime = null),
        (this.task.timeSpent = null),
        (this.task.userStory = "");
    },
    submit() {
      this.$store
        .dispatch("updateTask", { Task: this.task })
        .then(response => {
          if (response.isTaskUpdatedSuccessfully === true) {
            this.$router.push("/table");
          } else {
            alert(response.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
