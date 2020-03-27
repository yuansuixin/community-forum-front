import { extend, localize } from 'vee-validate'
import { required, email, min, length, max, is, confirmed } from 'vee-validate/dist/rules'
// import { i18n } from './i18n'
// import ZH from 'vee-validate/dist/locale/zh_CN'

// 修改默认配置项
// configure({
//   defaultMessage: (field, values) => {
//     values._field_ = i18n.t(`fields.${field}`)
//     return i18n.t(`validation.${values._rule_}`, values)
//   }
// })

// 按需引入规则
// extend('required', required)
// extend('email', email)
// extend('min', min)
// extend('length', length)

extend('required', {
  ...required
})
extend('email', {
  ...email
})
extend('min', {
  ...min
})
extend('max', {
  ...max
})
extend('length', {
  ...length
})
extend('confirmed', {
  ...confirmed
})

extend('is', {
  ...is
})

localize({
  ZH: {
    messages: {
      required: '请输入{_field_}',
      email: '请输入正确格式的邮箱',
      min: '请输入至少{length}位数的{_field_}',
      max: '{_field_}不得超过{length}位',
      length: '{_field_}必须为{length}位',
      is: '两次输入的密码不一致',
      confirmed: '请确认密码'
    },
    names: {
      username: '用户名',
      password: '密码',
      repasswd: '确认密码',
      code: '验证码'
    }
  }
})

localize('ZH')
