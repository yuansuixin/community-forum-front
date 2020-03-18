import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from 'vee-validate/dist/locale/zh_CN.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    zh_CN: {
      fields: {
        username: '用户名',
        password: '密码',
        repasswd: '确认密码',
        code: '验证码'
      },
      validation: {
        ...zh.messages,
        required: '请输入{_field_}',
        email: '请输入正确格式的邮箱',
        min: '请输入至少{length}位数的{_field_}',
        max: '{_field_}不得超过{length}位',
        length: '{_field_}必须为{length}位',
        is: '两次输入的密码不一致'
      }
    }
  }
})

export { i18n }
