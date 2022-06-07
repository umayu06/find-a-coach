export default {
  async addRequest(context, payload) {
    const response = await fetch(
      `https://connect-92480-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data!');
      throw error;
    }

    context.commit('addRequest', payload);
  },

  async loadRequests(context) {
    const response = await fetch(
      `https://connect-92480-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${context.rootGetters.userId}.json`
    );

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data!');
      throw error;
    }
    const responseData = await response.json();
    const requests = [];
    for (const key in responseData) {
      const newRequest = {
        id: key,
        ...responseData[key],
      };
      requests.push(newRequest);
    }
    context.commit('setRequests', requests);
  },
};
