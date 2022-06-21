export default {
  setUser(state, user) {
    state.userId = user.id;
    state.token = user.token;
  },
};
