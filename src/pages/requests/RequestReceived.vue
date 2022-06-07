<template>
  <div>
    <base-dialog :show="!!error" title="An error has occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="!isLoading && hasRequest">
          <RequestItem
            v-for="request in requestsReceived"
            :key="request"
            :email="request.email"
            :message="request.message"
          />
        </ul>
        <h3 v-else>No requests received</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  name: 'RequestReceived',
  components: {
    RequestItem,
  },
  created() {
    this.loadRequests();
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    requestsReceived() {
      console.log('req', this.$store.getters['requests/requestsReceived']);
      return this.$store.getters['requests/requestsReceived'];
    },
    hasRequest() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('requests/loadRequests');
        this.isLoading = false;
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
