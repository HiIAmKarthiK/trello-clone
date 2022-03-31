export const state = () => ({
  allBoards: [],
});

export const mutations = {
  SET_BOARDS(state, boards) {
    state.allBoards = boards;
  },
  ADD_BOARD(state, board) {
    state.allBoards.unshift(board);
  },
  DELETE_BOARD(state, boardId) {
    state.allBoards = state.allBoards.filter((board) => board.id != boardId);
  },
};

export const actions = {
  async setBoards(context) {
    let boards = [];
    if (this.$fire.auth.currentUser && this.$fire.auth.currentUser.uid) {
      const boardsRef = await this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .collection('boards')
        .orderBy('dateCreated', 'asc');
      const boardSnaphot = await boardsRef.get();
      if (boardSnaphot.docs.length > 0) {
        for (let doc of boardSnaphot.docs) {
          let data = doc.data();
          data.id = doc.id;
          boards.unshift(data);
        }
      }
    }
    context.commit('SET_BOARDS', boards);
  },
  addBoard(context, board) {
    context.commit('ADD_BOARD', board);
  },
  deleteBoard(context, boardId) {
    context.commit('DELETE_BOARD', boardId);
  },
};

export const getters = {
  getBoards(state) {
    return state.allBoards;
  },
};
