import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  modal: false,
  createRoomFormFlag: false,
  joinRoomFormFlag: false,
  createEventFormFlag: false,
  events: [],
  roomId: null,
  userId: null,
  waiting: false
}

const mutations = {
  switchBoolean: (state, payload) => {
    state[payload.property] = payload.flag
  },
  setRoomId: (state, id) => {
    state['roomId'] = id
  },
  setString: (state, payload) => {
    state[payload.property] = payload.str
  },
  setArray: (state, payload) => {
    state[payload.property] = payload.array
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
