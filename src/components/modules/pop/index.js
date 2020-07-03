import PopComponent from './Pop'

const Pop = {}
Pop.install = (Vue) => {
  // 完成注册pop组件
  const PopConstructor = Vue.extend(PopComponent)
  const instance = new PopConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  // 添加实例方法，以供全局进行调用
  Vue.prototype.$pop = (type, msg) => {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }
}

export default Pop
