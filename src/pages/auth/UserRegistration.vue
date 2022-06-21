<template>
  <base-card>
    <form @submit.prevent="registerUser()">
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="abcd@gmail.com" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="form-control">
        <p v-if="error" id="error">{{ error }}</p>
      </div>
      <base-button submit>Sign-up</base-button>
      <base-button mode="outline" link to="login">Login</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  name: 'UserRegistration',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async registerUser() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      const response = await fetch('http://localhost:3000/auth/registration', {
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
      this.$router.push('login');
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
