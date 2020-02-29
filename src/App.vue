<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <validation-provider
            name="用户名"
            rules="required|email"
            v-slot="{ errors }"
          >
            <div class="layui-input-inline">
              <input
                type="text"
                name="username"
                v-model.trim="username"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error layui-form-mid">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <validation-provider
            name="密码"
            rules="required|min:6"
            v-slot="{ errors }"
          >
            <div class="layui-input-inline">
              <input
                type="password"
                name="title"
                v-model="password"
                required
                lay-verify="required"
                placeholder="请输入密码"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error layui-form-mid">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <validation-provider
            name="验证码"
            rules="required|length:4"
            v-slot="{ errors }"
          >
            <div class="layui-input-inline">
              <input
                type="text"
                name="title"
                v-model="code"
                required
                lay-verify="required"
                placeholder="请输入验证码"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <span class="error layui-form-mid">{{ errors[0] }}</span>
          </validation-provider>
          <div
            class="layui-form-mid svg"
            v-html="svg"
            @click="getCaptcha()"
          ></div>
        </div>
        <button type="button" class="layui-btn" @click="checkForm()">
          立即登录
        </button>
        <a href="http://www.layui.com" class="imooc-link">忘记密码</a>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'app',
  components: {
    ValidationProvider
  },
  data () {
    return {
      svg: '',
      username: '',
      password: '',
      code: '',
      errorMsg: []
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:3000/getCaptcha').then(res => {
        if (res.status === 200) {
          const obj = res.data
          if (obj.code === 200) {
            this.svg = obj.data
          }
        }
      })
    },
    checkForm () {
      this.errorMsg = []
      if (!this.username) {
        this.errorMsg.push('用户名不可为空')
      }
      if (!this.password) {
        this.errorMsg.push('密码不可为空')
      }
      if (!this.code) {
        this.errorMsg.push('验证码不可为空')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}
.layui-container {
  background: #fff;
}
input {
  width: 190px;
}
.imooc-link {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}
.svg {
  position: relative;
  top: -15px;
}
.error {
  color: red;
}
</style>
