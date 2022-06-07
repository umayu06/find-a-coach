<template>
  <div>
    <base-dialog :show="!!error" title="A error has occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-controls">
          <label for="email">Enter your e-mail id</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abcd@gmail.com"
            v-model.trim="email"
          />
        </div>
        <div class="form-controls">
          <label for="message">Enter the message</label>
          <textarea name="message" id="message" v-model.trim="message"></textarea>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and message</p>
        <div class="actions">
          <base-button>Send message</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  name: 'ContactCoach',
  props: ['id'],
  data() {
    return {
      error: null,
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    async submitForm() {
      if (!this.email || !this.email.includes('@') || !this.message) {
        this.formIsValid = false;
        return;
      }

      try {
        await this.$store.dispatch('requests/addRequest', {
          coachId: this.id,
          email: this.email,
          message: this.message,
        });
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.form-controls {
  margin: 0.5rem 0rem;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}
input:active,
textarea:active {
  border: 1px solid #3d008d;
  outline: none;
  background-color: #f0e6fd;
}
.errors {
  color: red;
}
</style>
