let dom = {
  every: function (nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i], i)
    }
    return nodeList
  },

  uniqueClass: function (element, className) {
    let siblings = element.parentNode.children
    dom.every(siblings, (el) => {
      el.classList.remove(className)
    })
    element.classList.add(className)
  },

  index: function (element) {
    let siblings = element.parentNode.children
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] === element) {
        return i
      }
    }
    return -1
  },

  on: function (element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
      let el = e.target
      while (!el.matches(selector)) {
        if (el === element) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el, e, el)
    })
  },

  create: function (html, children) {
    let template = document.createElement('template')
    template.innerHTML = html.trim()
    let node = template.content.firstChild
    if (children) {
      dom.append(node, children)
    }
    return node
  },

  append: function (node, children) {
    if (children.length === undefined) {
      children = [children]
    }
    for (let i = 0; i < children.length; i++) {
      parent.appendChild(children[i])
    }
    return parent
  },
}