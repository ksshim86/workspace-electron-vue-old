const state = {
  selectedNodeId: -1,
  selectedWNode: {}
}
const getters = {
  getSelectedNodeId: state => state.selectedNodeId,
  getSelectedWNode: state => state.selectedWNode
}

const mutations = {
  setSelectedNodeId(state, value) {
    state.selectedNodeId = value
  },
  setSelectedWNode(state, value) {
    state.selectedWNode = value
  }
}

const actions = {
  setSelectedNodeId: ({ commit }, payload) => {
    commit('setSelectedNodeId', payload)
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
