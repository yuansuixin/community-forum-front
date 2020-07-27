<template>
  <div class="layui-container flex">
    <div class="layui-row font pb3">确定更新账号为：{{username}} 吗？</div>
    <div class="layui-row">
      <button type="button" :class="{'layui-btn-disabled':isSend}" class="layui-btn" @click="submit">确定更新吗</button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '../api/user'

let obj = {}
export default {
  name: 'Confirm',
  data() {
    return {
      username: '',
      isSend: false
    }
  },
  mounted() {
    const queryStr = window.location.href.replace(/.*\?/, '')
    obj = Object.fromEntries(queryStr.split('&').map(v => {
      v.split('=')
      this.username = obj.username
    }))
  },
  methods: {
    submit() {
      obj.username = this.username
      updateUsername(obj).then(res => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}
  .font{
    font-size: 16px;
    color: #333;
  }
</style>
