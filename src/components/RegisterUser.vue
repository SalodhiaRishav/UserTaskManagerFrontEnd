<template>
  <div>
    <form>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="firstName">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            required
            v-model="user.firstName"
            v-validate="'required|min:1|max:20'"
            name="firstName"
          />
          <span class="errorMessage">{{ errors.first("firstName") }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            required
            v-model="user.lastName"
            v-validate="'required|min:1|max:20'"
            name="lastName"
          />
          <span class="errorMessage">{{ errors.first("lastName") }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="Email"
            required
            v-model="user.email"
            v-validate="'required|email'"
            name="email"
          />
          <span class="errorMessage">{{ errors.first("email") }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mb-3">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            required
            v-model="user.password"
            v-validate="'required|min:1|max:20'"
            name="password"
          />
          <span class="errorMessage">{{ errors.first("password") }}</span>
        </div>
      </div>
      <div class="row">
        <button
          class="col-6 btn btn-lg btn-primary btn-block"
          type="submit"
          @click.prevent="submit"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      const newUser = {
        User: this.user
      };
      this.$store
        .dispatch("registerUser", newUser)
        .then(response => {
          if (response.isUserRegistered === true) {
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
