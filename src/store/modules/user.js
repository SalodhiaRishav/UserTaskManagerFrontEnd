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
            resolve({ isLogin: false, message: response.data.message });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerUser: (context, newUser) => {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:56329/json/reply/CreateUserRequestDTO";
      axios
        .post(url, newUser)
        .then(response => {
          if (response.data.success === true) {
            context.commit("setLoginedUser", response.data.data);
            resolve({
              isUserRegistered: true,
              registeredUser: response.data.data
            });
          } else {
            resolve({
              isUserRegistered: false,
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
