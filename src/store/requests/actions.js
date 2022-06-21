export default {
  async addRequest(context, payload) {
    const { coachId, ...contactData } = payload;
    const token = context.rootGetters['auth/token'];

    const response = await fetch(`http://localhost:3000/user/contactDetails/${coachId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': JSON.parse(token),
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data!');
      throw error;
    }

    context.commit('addRequest', payload);
  },

  async loadRequests(context) {
    const userId = context.rootGetters['auth/userId'];
    const token = context.rootGetters['auth/token'];
    const response = await fetch(`http://localhost:3000/user/requests/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': JSON.parse(token),
      },
    });

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data!');
      throw error;
    }
    const requests = await response.json();
    context.commit('setRequests', requests);
  },
};
