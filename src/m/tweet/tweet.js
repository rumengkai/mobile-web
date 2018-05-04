import Vue from 'vue'
import App from './App'

import * as filters from 'src/filters' // global filter

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

new Vue({
  el: '#tweet',
  template: '<App/>',
  components: { App },
})
