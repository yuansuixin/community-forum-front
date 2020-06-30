import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Myinfo from '../components/user/common/MyInfo'

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
const MyInfo = () => import('../components/user/common/MyInfo')
const Accounts = () => import('../components/user/common/Accounts')
const Passwd = () => import('../components/user/common/Passwd')
const PicUpload = () => import('../components/user/common/PicUpload')
const MyPost = () => import('../components/user/common/MyPost')
const MyCollection = () => import('../components/user/common/MyCollection')

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
        component: Settings,
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'account',
            name: 'account',
            component: Accounts
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: Passwd
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          }
        ]
      }, {
        path: 'posts',
        name: 'posts',
        component: Posts,
        children: [{
          path: '',
          name: 'mypost',
          component: MyPost
        }, {
          path: 'mycollection',
          name: 'mycollection',
          component: MyCollection
        }]
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
