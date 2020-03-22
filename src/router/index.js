import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')
const Forget = () => import('../views/Forget.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      // 解决注册页面没有sid的问题，只能从login页面进入注册页面，否则就跳转到login页面
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

const router = new VueRouter({
  routes
})

export default router
