import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  modal: false
}

const mutations = {
  switchModal: (state, flag) => {
    state.modal = flag
  }
}

const getters = {}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
