export default {
  async addCoach(context, data) {
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://connect-92480-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

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

    const response = await fetch(
      'https://connect-92480-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json'
    );
    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch data!');
      throw error;
    }

    const responseData = await response.json();
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
