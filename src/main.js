import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
// method1 to zh
// import zh from 'vee-validate/dist/locale/zh_CN'
// method2
import './local/index'

Vue.use(VeeValidate)
// method1 to zh
// Validator.localize('zh-CN', zh)

// method2
const validator = new Validator()
validator.localize('zh-CN')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
