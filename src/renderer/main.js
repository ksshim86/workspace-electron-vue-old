import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import VueDraggableResizable from 'vue-draggable-resizable'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)

Vue.component('vue-draggable-resizable', VueDraggableResizable)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
