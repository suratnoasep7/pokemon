// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueLazyload from 'vue-lazyload'



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLazyload, {
  lazyComponent: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
