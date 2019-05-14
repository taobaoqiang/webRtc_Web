import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meeting_status: ''
  },
  mutations: {
    meet_commit(state, msg) {
      state.meeting_status = msg
    }
  },
  actions: {

  }
})