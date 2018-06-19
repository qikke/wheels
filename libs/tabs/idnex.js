class Tabs {
  constructor(options) {
    let defaultOption = {
      element: '',
      activeName: 'active',
      navSelector: '[data-role=tabs-nav]',
      panesSelector: '[data-role=tabs-panes]',
    }
    this.options = Object.assign(defaultOption, options)
    this.checkOptions().bindEvents().setDefaultTab()
  }

  checkOptions() {
    if (!this.options['element']) {
      throw new Error("Element is required!")
    }
    return this
  }

  bindEvents() {
    dom.on(this.options.element, 'click', `${this.options.navSelector}>li`, (e,el) => {
      // 箭头函数不接收call的第一个参数！这里的this还是函数外面的this
      dom.uniqueClass(el,this.options.activeName)
      let index = dom.index(el)
      let panesNode = this.options.element.querySelectorAll(`${this.options.panesSelector}>li`)
      dom.uniqueClass(panesNode[index],this.options.activeName)
    })
    return this
  }

  setDefaultTab(){
    this.options.element.querySelectorAll(`${this.options.navSelector}>li`)[0].click()
    this.options.element.querySelectorAll(`${this.options.panesSelector}>li`)[0].click()
  }
}