const state = {
  drawer: false
}
const getters = {
  getDrawer: state => state.drawer
}

const mutations = {
  IS_DRAWER(state, value) {
    state.drawer = value === undefined ? true : value
  }
}

const actions = {
  IS_DRAWER: ({ commit }) => {
    commit('IS_DRAWER')
  }
}


export default {
  name: 'WNavigation',
  state,
  mutations,
  actions,
  getters
}
