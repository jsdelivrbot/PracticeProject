import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
