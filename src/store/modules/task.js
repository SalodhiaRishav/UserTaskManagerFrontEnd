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
            resolve({ isAddedSuccessfully: true });
          } else {
            reject({
              isAddedSuccessfully: false,
              error: response.data.message
            });
          }
        })
        .catch(error => {
          context.commit("changeNewTaskAddedStatus", false);
          reject({ isAddedSuccessfully: false, error: error });
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
            context.commit("setUserTasks", response.data.data);
            resolve({ dataFetched: true });
          } else {
            reject({ dataFeteched: false, error: response.message });
          }
        })
        .catch(error => {
          reject({ dataFeteched: false, error: error });
        });
    });
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
