import { createStore } from 'vuex'

export default createStore({
  state: {
    wsServerAddress: "localhost:8888",
    serverAddress: "localhost:8888",
    // wsServerAddress: "150.158.98.146:8888",
    // serverAddress: "150.158.98.146:8888",


    logged: false,

  },
  mutations: {
    updateLogged(state, payload) {
      state.logged = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
