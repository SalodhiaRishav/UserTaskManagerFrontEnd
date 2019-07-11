<template>
  <div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <form class="form-signin">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            v-validate="'required|email'"
            name="email"
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            v-model="email"
            required
            autofocus
          />
          <span class="errorMessage">{{ errors.first("email") }}</span>
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            v-model="password"
            required
          />
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            @click.prevent="submit"
          >
            Sign in
          </button>
          <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: null,
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch("loginUser", { email: this.email, password: this.password })
        .then(response => {
          if (response.isLogin === true) {
            this.$store.dispatch("changeLoginStatus", true);
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
