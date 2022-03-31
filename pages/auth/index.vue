<template>
  <div class="auth-container">
    <div class="login-form">
      <v-card elevation="2" outlined class="card">
        <v-card-title class="justify-center">Login Form</v-card-title>
        <v-form ref="form" class="form" v-on:submit.prevent="submitForm">
          <v-text-field
            v-model="auth.email"
            :rules="emailRules"
            prepend-icon="mdi-account"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="auth.password"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            type="password"
            label="Password"
            class="input"
            required
          ></v-text-field>
          <v-btn elevation="2" type="submit">SUBMIT</v-btn>
        </v-form>
      </v-card>
    </div>
    <v-snackbar
      :timeout="4000"
      v-model="snackbar"
      color="red accent-2"
      absolute
      top
      center
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: ``,
      auth: {
        email: '',
        password: '',
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => v.length >= 5 || 'Password length should be more than 5',
      ],
    };
  },
  methods: {
    async submitForm() {
      try {
        if (this.$refs.form.validate()) {
          const val = await this.$fire.auth.signInWithEmailAndPassword(
            this.auth.email,
            this.auth.password
          );
          this.$router.push('/');
        }
      } catch (err) {
        (this.text = err.message), (this.snackbar = true);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .login-form {
    width: 80%;

    .card {
      padding: 1rem;

      .form > * {
        padding: 1rem;
      }
    }
  }

  @media (min-width: $mobile-breakpoint) {
    .login-form {
      width: 50%;
    }
  }
}

// input:-internal-autofill-selected {
//   /* border: 1px solid green; */
//   -webkit-text-fill-color: transparent !important;
//   -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
//   box-shadow: 0 0 0px 1000px transparent inset !important;
//   transition: background-color 5000s ease-in-out 0s !important;
//   border: 1px solid transparent !important;
// }
</style>
