import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import dataLink from './module/dataLink'
import formCreate from './module/formCreate'
import workFlow from './module/workFlow'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    dataLink,
    formCreate,
    workFlow
  }
})
