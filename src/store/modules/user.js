import axios from "axios";

const state = {
  loginStatus: false,
  loginedUser: null
};

const mutations = {
  changeLoginStatus: (state, value) => {
    state.loginStatus = value;
  },
  setLoginedUser: (state, value) => {
    state.loginedUser = value;
  }
};

const getters = {
  loginStatus: state => {
    return state.loginStatus;
  },
  loginedUser: state => {
    return state.loginedUser;
  }
};

const actions = {
  changeLoginStatus: (context, value) => {
    context.commit("changeLoginStatus", value);
  },
  loginUser: (context, loginData) => {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:56329/json/reply/LoginUserRequestDTO";
      axios
        .post(url, { email: loginData.email, password: loginData.password })
        .then(response => {
          if (response.data.success === true) {
            context.commit("setLoginedUser", response.data.data);
            resolve({ isLogin: true });
          } else {
            reject({ isLogin: false, error: response.data.message });
          }
        })
        .catch(error => {
          reject({ isLogin: false, error: error });
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
