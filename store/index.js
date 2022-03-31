export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

export const actions = {
  async onAuthStateChangedAction(context, payload) {
    if (!payload.authUser) {
      context.commit('SET_USER', null);

      this.$router.push('/auth');
    } else {
      const { uid, email } = payload.authUser;

      context.commit('SET_USER', { uid, email });
      context.dispatch('boards/setBoards');
    }
  },
};

export const getters = {};
