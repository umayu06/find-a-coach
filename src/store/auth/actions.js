export default {
  setUser(context, user) {
    localStorage.setItem('token', JSON.stringify(user));
    context.commit('setUser', user);
  },
  logout(context) {
    localStorage.removeItem('token');
    context.commit('setUser', {
      id: null,
      token: null,
    });
  },
};
