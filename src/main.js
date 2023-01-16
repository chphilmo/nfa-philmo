import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import VueMeta from 'vue-meta';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VeeValidate from 'vee-validate'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMasonry from 'vue-masonry-css'

import './custom.scss'

import DateFilter from './filters/date.js'

import setupInterceptors from './services/setupInterceptors'


Vue.config.productionTip = false


Vue.use(Vuex);

setupInterceptors(store);

Vue.use(VueMeta);


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueMasonry)

Vue.use(VeeValidate)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
  this.$store.dispatch('nfa/getCurrentWallet')
  //this.$store.dispatch('nft/MatterSelled')
  }
}).$mount('#app')
