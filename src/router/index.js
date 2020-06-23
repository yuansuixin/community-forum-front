import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')
const Forget = () => import('../views/Forget.vue')
const Index = () => import('../views/channels/index.vue')
const Template1 = () => import('../views/channels/Template1.vue')
const Center = () => import('../views/Center.vue')
const UserCenter = () => import('../components/user/Center.vue')
const Settings = () => import('../components/user/Settings.vue')
const Posts = () => import('../components/user/Posts.vue')
const Msg = () => import('../components/user/Msg.vue')
const Others = () => import('../components/user/Others.vue')
const User = () => import('../views/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
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
  }, {
    path: '/user/:uid',
    name: 'home',
    component: User
  },
  {
    path: '/center',
    component: Center,
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      }, {
        path: 'set',
        name: 'set',
        component: Settings
      }, {
        path: 'posts',
        name: 'posts',
        component: Posts
      }, {
        path: 'msg',
        name: 'msg',
        component: Msg
      }, {
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
