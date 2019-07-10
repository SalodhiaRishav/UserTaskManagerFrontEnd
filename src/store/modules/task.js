import axios from "axios";

const state = {
  userTasks: null,
  newTaskAddedStatus: false
};

const mutations = {
  setUserTasks: (state, tasks) => {
    state.userTasks = tasks;
  },
  changeNewTaskAddedStatus: (state, value) => {
    state.newTaskAddedStatus = value;
  }
};

const getters = {
  userTasks: state => {
    return state.userTasks;
  },
  newTaskAddedStatus: state => {
    return state.newTaskAddedStatus;
  }
};

const actions = {
  postNewTask: (context, task) => {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:56329//json/reply/CreateTaskRequestDTO";
      const config = {
        headers: { "Content-Type": "application/json" }
      };
      axios
        .post(url, task, config)
        .then(response => {
          if (response.data.success === true) {
            context.commit("changeNewTaskAddedStatus", true);
            resolve({ isTaskAddedSuccessfully: true });
          } else {
            resolve({
              isTaskAddedSuccessfully: false,
              message: response.data.message
            });
          }
        })
        .catch(error => {
          context.commit("changeNewTaskAddedStatus", false);
          reject(error);
        });
    });
  },
  setUserTasks: (context, userId) => {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:56329/usertasks/" + userId;
      axios
        .get(url)
        .then(response => {
          if (response.data.success === true) {
            const userTasks=response.data.data;
            context.commit("setUserTasks",userTasks);
            resolve({ isUserTasksFetched: true });
          } else {
            resolve({ isUserTasksFetched: false, message: response.data.message });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // deleteTask: (context, taskId) => {
  //   const url = "http://localhost:56329/task/" + taskId;
  //   axios
  //     .post(url, taskId, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       }
  //     })
  //     .then(response => {
  //       alert(response);
  //     });
  // }
};

export default {
  state,
  mutations,
  getters,
  actions
};
