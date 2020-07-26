import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'

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
const Confirm = () => import('../views/Confirm')
const Reset = () => import('../views/Reset')

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
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
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
    meta: { requiresAuth: true }, // 元数据
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      }, {
        path: 'set',
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
// 全局的路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    console.log(payload)
    // 查看token是否过期
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  // 路由原信息
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要登录的页面进行区别
    if (isLogin) {
      // 已经登录
      // 权限判断，meat元数据
      next()
    } else {
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
