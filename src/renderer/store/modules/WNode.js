const state = {
  nextNodeId: 10,
  selectedNodeId: -1,
  newNodeId: -1,
  selectedWNode: {
    wNode: {
      id: 0,
      name: '',
      type: '',
      path: '',
      children: []
    },
    parentWNodeIndexs: []
  },
  selectedParentWNode: {},
  dragWNode: {
    wNode: {
      id: 0,
      name: '',
      type: '',
      path: '',
      children: []
    },
    parentWNodeId: 0,
    parentWNodeIndexs: []
  },
  dropWNode: {
    id: 0,
    parentWNodeId: 0,
    parentWNodeIndexs: []
  }
}
const getters = {
  getNextNodeId: state => state.nextNodeId,
  getSelectedNodeId: state => state.selectedNodeId,
  getNewNodeId: state => state.newNodeId,
  getSelectedParentWNode: state => state.selectedParentWNode,
  GET_SELECTED_W_NODE: state => state.selectedWNode,
  GET_DRAG_W_NODE: state => state.dragWNode,
  GET_DROP_W_NODE: state => state.dropWNode
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
  setSelectedParentWNode(state, value) {
    state.selectedParentWNode = value
  },
  setSelectedWNodeChildPush(state, value) {
    state.selectedWNode.children.push(value)
  },
  setSelectedParentWNodeChildPush(state, value) {
    state.selectedParentWNode.children.push(value)
  },
  SET_SELECTED_W_NODE: (state, value) => {
    state.selectedWNode = value
  },
  SET_DRAG_W_NODE: (state, value) => {
    state.dragWNode = value
  },
  SET_DROP_W_NODE: (state, value) => {
    state.dropWNode = value
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
  },
  SET_DRAG_W_NODE: ({ commit }, payload) => {
    commit('SET_DRAG_W_NODE', payload)
  }
}

export default {
  name: 'WNode',
  state,
  mutations,
  actions,
  getters
}
