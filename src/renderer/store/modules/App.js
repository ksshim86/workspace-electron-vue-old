const state = {
  workspace: {
    isEmpty: false,
    path: ''
  }
}
const getters = {
  getWorkspaceIsEmpty: state => state.workspace.isEmpty,
  GET_WORKSPACE_PATH: state => state.workspace.path
}

const mutations = {
  SET_WORKSPACE_ISEMPTY(state, payload) {
    state.workspace.isEmpty = payload
  },
  SET_WORKSPACE_PATH(state, payload) {
    state.workspace.path = payload
  }
}

const actions = {
  SET_WORKSPACE_ISEMPTY: ({ commit }, payload) => {
    commit('SET_WORKSPACE_ISEMPTY', payload)
  },
  SET_WORKSPACE_PATH: ({ commit }, payload) => {
    commit('SET_WORKSPACE_PATH', payload)
  }
}

export default {
  name: 'App',
  state,
  mutations,
  actions,
  getters
}
