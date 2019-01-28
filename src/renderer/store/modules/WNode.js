const state = {
  selectedNodeId: -1,
  newNodeId: -1,
  selectedWNode: {}
}
const getters = {
  getSelectedNodeId: state => state.selectedNodeId,
  getNewNodeId: state => state.newNodeId,
  getSelectedWNode: state => state.selectedWNode
}

const mutations = {
  setSelectedNodeId(state, value) {
    state.selectedNodeId = value
  },
  setNewNodeId(state, value) {
    state.newNodeId = value
  },
  setSelectedWNode(state, value) {
    state.selectedWNode = value
  }
}

const actions = {
  setSelectedNodeId: ({ commit }, payload) => {
    commit('setSelectedNodeId', payload)
  },
  setNewNodeId: ({ commit }, payload) => {
    commit('setNewNodeId', payload)
  },
  setSelectedWNode: ({ commit }, payload) => {
    commit('setSelectedWNode', payload)
  }
}

export default {
  name: 'WNode',
  state,
  mutations,
  actions,
  getters
}
