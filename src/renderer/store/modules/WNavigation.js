const state = {
  drawer: '@@@@'
}

const mutations = {
  INCREMENT_MAIN_COUNTER(state) {
    state.drawer = !state.drawer
  }
}

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  name: 'WNavigation',
  state,
  mutations,
  actions
}
