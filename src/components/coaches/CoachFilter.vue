<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <label for="frontend">Frontend</label>
      <input type="checkbox" id="frontend" name="frontend" checked @change="setFilter" />
    </span>
    <span class="filter-option">
      <label for="backend">Backend</label>
      <input type="checkbox" id="backend" name="backend" checked @change="setFilter" />
    </span>
    <span class="filter-option">
      <label for="career">Career</label>
      <input type="checkbox" id="career" name="career" checked @change="setFilter" />
    </span>
  </base-card>
</template>

<script>
export default {
  name: 'CoachFilter',
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const coachId = event.target.id;
      const isActive = event.target.checked;
      const updatedfilters = {
        ...this.filters,
        [coachId]: isActive,
      };

      this.filters = updatedfilters;
      this.$emit('change-filter', this.filters);
    },
  },
};
</script>

<style scoped>
.filter-option {
  margin-right: 0.8rem;
}
</style>
