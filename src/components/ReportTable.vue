<template>
  <div>
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
            {{
              new Date(task.taskDate.match(/\d+/)[0] * 1)
                .toString()
                .substring(0, 16)
            }}
          </td>
          <td>{{ task.timeSpent }}</td>
          <td>{{ task.expectedTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: null,
      listFetched: false
    };
  },
  method: {},
  mounted() {
    let userId = sessionStorage.getItem("id");
    this.$store
      .dispatch("setUserTasks", userId)
      .then(response => {
        if (response.dataFetched === true) {
          this.tasks = this.$store.getters.userTasks;
          this.listFetched = true;
        } else {
          alert(response.error);
        }
      })
      .catch(error => {
        alert(error.error);
      });
  }
};
</script>
