const state = {
  workspace: {
    isEmpty: false
  }
}
const getters = {
  getWorkspaceIsEmpty: state => state.workspace.isEmpty
}

const mutations = {
  SET_WORKSPACE_ISEMPTY(state, payload) {
    state.workspace.isEmpty = payload
  }
}

const actions = {
  setWorkspaceIsEmpty: ({ commit }, payload) => {
    commit('SET_WORKSPACE_ISEMPTY', payload)
  }
}

export default {
  name: 'App',
  state,
  mutations,
  actions,
  getters
}
