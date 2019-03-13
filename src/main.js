// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import  'lib-flexible'
import './assets/style/util.css'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'vue-moment'
Vue.config.productionTip = false

Vue.use(ElementUi)
Vue.use(moment)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
