<template>
  <span class="badge" :class="type">{{ text }}</span>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: ['title', 'type'],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  border-radius: 30px;
  font-size: 0.5rem;
  background-color: #ccc;
  color: #252525;
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.5rem 1.5rem;
}
.frontend {
  background-color: #3d008d;
  color: white;
}
.backend {
  background-color: #f391e3;
  color: white;
}
.career {
  background-color: #8d006e;
  color: white;
}
</style>
