const state = {
  nextWNodeId: 10,
  selectedNodeId: -1,
  newNodeId: -1,
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
  },
  selectedWNode: {
    wNode: {
      id: 0,
      name: '',
      type: '',
      path: '',
      children: []
    },
    parentWNodeIndexs: []
  }
}
const getters = {
  getSelectedNodeId: state => state.selectedNodeId,
  getNewNodeId: state => state.newNodeId,
  getSelectedParentWNode: state => state.selectedParentWNode,
  GET_DRAG_W_NODE: state => state.dragWNode,
  GET_DROP_W_NODE: state => state.dropWNode,
  GET_SELECTED_W_NODE: state => state.selectedWNode,
  GET_NEW_W_NODE_ID: state => state.newNodeId,
  GET_NEXT_W_NODE_ID: state => state.nextWNodeId
}

const mutations = {
  SET_NEXT_W_NODE_ID(state, value) {
    console.log(`SET_NEXT_W_NODE_ID: ${value}`)
    state.nextWNodeId = value
  },
  SET_SELECTED_W_NODE: (state, value) => {
    state.selectedWNode = value
  },
  SET_DRAG_W_NODE: (state, value) => {
    state.dragWNode = value
  },
  SET_DROP_W_NODE: (state, value) => {
    state.dropWNode = value
  },
  SET_NEW_W_NODE_ID: (state, value) => {
    state.newNodeId = value
  }
}

const actions = {
  // SET_DRAG_W_NODE: ({ commit }, payload) => {
  //   commit('SET_DRAG_W_NODE', payload)
  // }
}

export default {
  name: 'WNode',
  state,
  mutations,
  actions,
  getters
}
