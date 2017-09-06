import Vue from 'vue'
import App from './App'

import VueResource from 'vue-resource'
Vue.use(VueResource)
new Vue({
  el: '#code-rule',
  template: '<App/>',
  components: { App },
})
