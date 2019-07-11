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
          />
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
          />
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
          />
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
          />
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
