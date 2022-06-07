<template>
  <div>
    <base-dialog :show="error" title="Error has occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h3>Register as a coach</h3>
        <CoachForm @save-data="saveData" />
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  name: 'CoachRegistration',
  components: {
    CoachForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveData(formData) {
      try {
        await this.$store.dispatch('coaches/addCoach', formData);
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
