export default {
  async addCoach(context, data) {
    const userId = context.rootGetters['auth/userId'];
    const token = context.rootGetters['auth/token'];

    const response = await fetch(`http://localhost:3000/user/addCoachDetails/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': JSON.parse(token),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data!');
      throw error;
    }

    context.commit('addCoach', { ...data, id: userId });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceUpdate && !context.getters.shouldUpdate) {
      return;
    }
    const token = context.rootGetters['auth/token'];
    const response = await fetch('http://localhost:3000/user/coaches', {
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

    const coaches = await response.json();
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
