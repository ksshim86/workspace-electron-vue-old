const state = {
  nextWNodeId: 10,
  dragWNode: {
    wNode: {
      id: 0,
      name: '',
      type: '',
      path: '',
      children: []
    },
    parentWNodeId: 0,
    parentWNodeIndexsAndWNodeIndex: []
  },
  dropWNode: {
    id: 0,
    path: '',
    parentWNodeId: 0,
    parentWNodeIndexsAndWNodeIndex: []
  },
  selectedWNode: {
    wNode: {
      id: 0,
      name: '',
      type: '',
      path: '',
      children: []
    },
    parentAndWNodeIds: [],
    parentWNodeIndexsAndWNodeIndex: []
  },
  editingWNode: {
    wNode: {
      id: 0,
      name: '',
      type: '',
      path: '',
      children: []
    },
    parentAndWNodeIds: [],
    parentWNodeIndexsAndWNodeIndex: [],
    status: '', // new or modify
    nameCheck: true
  }
}
const getters = {
  GET_DRAG_W_NODE: state => state.dragWNode,
  GET_DROP_W_NODE: state => state.dropWNode,
  GET_SELECTED_W_NODE: state => state.selectedWNode,
  GET_NEXT_W_NODE_ID: state => state.nextWNodeId,
  GET_EDITING_W_NODE: state => state.editingWNode
}

const mutations = {
  SET_NEXT_W_NODE_ID(state) {
    state.nextWNodeId += 1
  },
  SET_SELECTED_W_NODE: (state, value) => {
    state.selectedWNode = value
  },
  SET_DRAG_W_NODE: (state, value) => {
    state.dragWNode = value
  },
  SET_DRAG_W_NODE_PATH: (state, value) => {
    state.dragWNode.wNode.path = value
  },
  SET_DROP_W_NODE: (state, value) => {
    state.dropWNode = value
  },
  SET_EDITING_W_NODE: (state, value) => {
    state.editingWNode = value
  },
  SET_EDITING_W_NODE_NAME: (state, value) => {
    state.editingWNode.wNode.name = value
  },
  SET_EDITING_W_NODE_NAME_CHECK: (state, value) => {
    state.editingWNode.nameCheck = value
  }
}

const actions = {
  SET_SELECTED_W_NODE: ({ commit }, payload) => {
    commit('SET_SELECTED_W_NODE', payload)
  },
  SET_DRAG_W_NODE: ({ commit }, payload) => {
    commit('SET_DRAG_W_NODE', payload)
  },
  SET_DRAG_W_NODE_PATH: ({ commit }, payload) => {
    commit('SET_DRAG_W_NODE_PATH', payload)
  },
  SET_DROP_W_NODE: ({ commit }, payload) => {
    commit('SET_DROP_W_NODE', payload)
  },
  SET_NEXT_W_NODE_ID: ({ commit }) => {
    commit('SET_NEXT_W_NODE_ID')
  },
  SET_EDITING_W_NODE: ({ commit }, payload) => {
    commit('SET_EDITING_W_NODE', payload)
  },
  SET_EDITING_W_NODE_NAME: ({ commit }, payload) => {
    commit('SET_EDITING_W_NODE_NAME', payload)
  },
  SET_EDITING_W_NODE_NAME_CHECK: ({ commit }, payload) => {
    commit('SET_EDITING_W_NODE_NAME_CHECK', payload)
  }
}

export default {
  name: 'WNode',
  state,
  mutations,
  actions,
  getters
}
