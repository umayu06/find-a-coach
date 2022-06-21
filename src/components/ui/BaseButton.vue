<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :class="mode" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    link: {
      type: Boolean,
      default: false,
      required: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    mode: {
      type: String,
      required: false,
      default: 'flat',
    },
  },
};
</script>

<style scoped>
button,
a {
  font-size: 1rem;
  text-decoration: none;
  border-radius: 12px;
  padding: 0.4rem 1rem;
  margin: 2px;
  cursor: pointer;
  background-color: transparent;
}
.flat {
  border: 2px solid #3d008d;
  background-color: #3d008d;
  color: whitesmoke;
}
.outline {
  border: 2px solid #3d008d;
  color: #3d008d;
}
.flat:hover {
  border: 2px solid whitesmoke;
}
.outline:hover {
  border: 0;
  background-color: #f391e3;
}
.disableClick {
  pointer-events: none;
}
</style>
