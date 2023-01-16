import Vue from 'vue'
import Vuex from 'vuex'

import { nfa } from './nfa.module';
import { auth } from './auth.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth,
  nfa
  }
})
