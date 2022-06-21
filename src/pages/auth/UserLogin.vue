<template>
  <base-card>
    <form @submit.prevent="login">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" required placeholder="abcd@gmail.com" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">password</label>
        <input type="password" id="password" required v-model="password" />
      </div>
      <div class="form-control">
        <p v-if="error" id="error">{{ error }}</p>
      </div>
      <base-button submit>Login</base-button>
      <base-button mode="outline" link to="userRegistration">Sign-up</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      const user = {
        email: this.email,
        password: this.password,
      };

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (!response.ok) {
        this.error = data.message;
        return;
      }

      if (data && data.token) {
        const user = {
          id: data.id,
          token: JSON.stringify(data.token),
        };

        this.$store.dispatch('auth/setUser', user);
        this.$router.replace('coaches');
      }
    },
  },
};
</script>

<style scoped>
.form-controls {
  margin: 0.5rem 0rem;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
input {
  display: block;
  border: 1px solid #ccc;
  width: 100%;
  font: inherit;
  height: 1.5rem;
  padding: 2px, 0;
  margin-bottom: 0.8rem;
}
#error {
  color: red;
}
</style>
