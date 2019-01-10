const state = {
  drawer: false
}
const getters = {
  getDrawer: state => state.drawer
}

const mutations = {
  IS_DRAWER(state, value) {
    console.log(`IS_DRAWER : ${value}`)
    state.drawer = value
  }
}

const actions = {
  IS_DRAWER: ({ commit }, payload) => {
    commit('IS_DRAWER', payload)
  }
}

export default {
  name: 'WNavigation',
  state,
  mutations,
  actions,
  getters
}
