import axios from "axios";

const state = {
  taskCategories: null
};

const mutations = {
  setTaskCategories: (state, taskCategories) => {
    state.taskCategories = taskCategories;
  }
};

const getters = {
  taskCategories: state => {
    return state.taskCategories;
  }
};

const actions = {
  getTaskCategories: context => {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:56329/taskcategory";
      axios
        .get(url)
        .then(response => {
          if (response.data.success === true) {
            context.commit("setTaskCategories", response.data.data);
            resolve({ isTaskCategoriesFetched: true });
          } else {
            resolve({
              isTaskCategoriesFetched: false,
              message: response.data.message
            });
          }
        })
        .catch(error => {
          reject(error);
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
