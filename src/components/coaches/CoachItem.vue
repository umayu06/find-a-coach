<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge v-for="area in coach.areas" :key="area" :title="area" :type="area"></base-badge>
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="coachContactLink">Contact</base-button>
      <base-button link mode="flat" :to="coachDetailsLink">Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CoachItem',
  props: {
    coach: Object,
  },
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    rate() {
      return this.coach.hourlyRate;
    },
    coachContactLink() {
      return `${this.$route.path}/${this.coach.id}/contact`;
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.coach.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 2px solid #424242;
  padding: 1rem;
  border-radius: 12px;
}
h3 {
  font-size: 1.5rem;
}
h3,
h4,
div {
  margin: 0.5rem 0;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
