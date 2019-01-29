const state = {
  nextNodeId: 9,
  selectedNodeId: -1,
  newNodeId: -1,
  selectedWNode: {
    id: 0,
    name: '',
    type: '',
    path: '',
    children: []
  },
  selectedParentWNode: {}
}
const getters = {
  getNextNodeId: state => state.nextNodeId,
  getSelectedNodeId: state => state.selectedNodeId,
  getNewNodeId: state => state.newNodeId,
  getSelectedWNode: state => state.selectedWNode,
  getSelectedParentWNode: state => state.selectedParentWNode
}

const mutations = {
  setNextNodeId(state) {
    state.nextNodeId += 1
  },
  setSelectedNodeId(state, value) {
    state.selectedNodeId = value
  },
  setNewNodeId(state, value) {
    state.newNodeId = value
  },
  setSelectedWNode(state, value) {
    state.selectedWNode = value
  },
  setSelectedParentWNode(state, value) {
    state.selectedParentWNode = value
  },
  setSelectedWNodeChildPush(state, value) {
    state.selectedWNode.children.push(value)
  },
  setSelectedParentWNodeChildPush(state, value) {
    state.selectedParentWNode.children.push(value)
  }
}

const actions = {
  setNextNodeId: ({ commit }) => {
    commit('setNextNodeId')
  },
  setSelectedNodeId: ({ commit }, payload) => {
    commit('setSelectedNodeId', payload)
  },
  setNewNodeId: ({ commit }, payload) => {
    commit('setNewNodeId', payload)
  },
  setSelectedWNode: ({ commit }, payload) => {
    commit('setSelectedWNode', payload)
  },
  setSelectedParentWNode: ({ commit }, payload) => {
    commit('setSelectedParentWNode', payload)
  },
  setSelectedWNodeChildPush: ({ commit }, payload) => {
    commit('setSelectedWNodeChildPush', payload)
  },
  setSelectedParentWNodeChildPush: ({ commit }, payload) => {
    commit('setSelectedParentWNodeChildPush', payload)
  }
}

export default {
  name: 'WNode',
  state,
  mutations,
  actions,
  getters
}
