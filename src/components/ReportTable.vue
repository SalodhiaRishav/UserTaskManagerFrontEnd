<template>
  <div>
    <div v-if="!listFetched">
      {{ errorMessage }}
    </div>
    <table class="table table-striped" v-if="listFetched">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Task Domain</th>
          <th scope="col">User Story</th>
          <th scope="col">TaskDate</th>
          <th scope="col">TimeSpent (in hrs.)</th>
          <th scope="col">ExpectedTime (in hrs.)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ task.taskCategory.categoryName }}</td>
          <td>{{ task.userStory }}</td>
          <td>
            {{ convertDate(task.taskDate) }}
          </td>
          <td>{{ task.timeSpent }}</td>
          <td>{{ task.expectedTime }}</td>
          <td>
            <a class="deleteLink" @click="deleteTask(task.id, index)">delete</a>
          </td>
          <td>
            <a class="deleteLink" @click="editTask(task)">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: "fetching userList",
      tasks: null,
      listFetched: false
    };
  },
  methods: {
    convertDate(someDate) {
      return new Date(someDate.match(/\d+/)[0] * 1).toString().substring(0, 16);
    },
    deleteTask(taskId, index) {
      this.$store
        .dispatch("deleteTask", taskId)
        .then(response => {
          if (response.isDeleted === true) {
            this.tasks.splice(index, 1);
            if (this.tasks.length === 0) {
              this.message = "No tasks found for this user";
            }
            alert("deleted successfully");
          } else {
            alert(response.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    editTask(task) {
      this.$store.dispatch("setTaskToEdit", task);
      this.$router.push("/edittask");
    }
  },
  mounted() {
    const userId = this.$store.getters.loginedUser.id;
    this.$store
      .dispatch("setUserTasks", userId)
      .then(response => {
        if (response.isUserTasksFetched === true) {
          const userTasks = this.$store.getters.userTasks;
          this.tasks = userTasks;
          this.listFetched = true;
        } else {
          this.errorMessage = response.message;
        }
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }
};
</script>
