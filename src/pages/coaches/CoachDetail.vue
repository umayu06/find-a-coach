<template>
  <div>
    <section v-if="!!selectedCoach">
      <section>
        <base-card>
          <h2>{{ name }}</h2>
          <h3>${{ rate }}/hour</h3>
        </base-card>
      </section>
      <section>
        <header>
          <base-card>
            <h3>Interested? Reach out now!</h3>
            <base-button v-if="!routeHasContact" link :to="contactLink" mode="outline"
              >Contact</base-button
            >
            <router-view></router-view>
          </base-card>
        </header>
      </section>
      <section>
        <base-card>
          <base-badge
            v-for="area in selectedCoach.areas"
            :key="area"
            :title="area"
            :type="area"
          ></base-badge>
          <p>{{ selectedCoach.description }}</p>
        </base-card>
      </section>
    </section>
    <section v-else>
      <base-card>
        <h2>Coach not found</h2>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CoachDetails',
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
  computed: {
    name() {
      return this.selectedCoach.name;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    routeHasContact() {
      return this.$route.path.includes('contact');
    },
  },
};
</script>
