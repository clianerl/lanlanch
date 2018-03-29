// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'

// 引用API文件
import api from './api/index.js'
// 引用工具文件
import util from './utils/index.js'

// 引入bootstrap
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$utils = util
Vue.prototype.$utils.vueObj = Vue.prototype
Vue.prototype.$utils.initFatherFunction()
Vue.prototype.$utils.mainVue = App  

Vue.config.devtools = true

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
})

