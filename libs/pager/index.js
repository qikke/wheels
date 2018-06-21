class Pager {
  constructor(options) {
    let defaultOptions = {
      element: null,
      buttonCount: 10,
      currentPage: 1,
      totalPage: 100,
      templates: {
        first: '<button class="first">首页</button>',
        prev: '<button class="prev">上一页</button>',
        last: '<button class="last">末页</button>',
        next: '<button class="next">下一页</button>',
        pageNumbers: '<ol data-role="pageNumbers"></ol>',
        number: '<span>%page%</span>',
      }
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.domRefs = {} //可以动态地改变节点
    this.checkOption().initHtml().bindEvents()
  }

  bindEvents() {
    dom.on(this.options.element, 'click', 'ol[data-role="pageNumbers"]>li', (e, el) => {
      this.goToPage(parseInt(el.dataset.page, 10))
    })
    this.domRefs.first.addEventListener('click', () => {
      this.goToPage(1)
    })
    this.domRefs.last.addEventListener('click', () => {
      this.goToPage(this.options.totalPage)
    })
    this.domRefs.prev.addEventListener('click', () => {
      this.goToPage(this.options.currentPage - 1)
    })
    this.domRefs.next.addEventListener('click', () => {
      this.goToPage(this.options.currentPage + 1)
    })
  }

  checkOption() {
    if (!this.options.element) {
      throw new Error("Element is required")
    }
    return this
  }

  initHtml() {
    let nav = (this.domRefs.nav = document.createElement('nav'))
    this.domRefs.first = dom.create(this.options.templates.first)
    this.domRefs.prev = dom.create(this.options.templates.prev)
    this.domRefs.last = dom.create(this.options.templates.last)
    this.domRefs.next = dom.create(this.options.templates.next)
    this._checkButtons()
    this.domRefs.numbers = this._createNumbers()
    nav.appendChild(this.domRefs.first)
    nav.appendChild(this.domRefs.prev)
    nav.appendChild(this.domRefs.numbers)
    nav.appendChild(this.domRefs.next)
    nav.appendChild(this.domRefs.last)

    this.options.element.appendChild(nav)
    return this
  }

  _checkButtons() {
    if (this.options.currentPage === 1) {
      this.domRefs.first.setAttribute('disabled', '')
      this.domRefs.prev.setAttribute('disabled', '')
    } else {
      this.domRefs.first.removeAttribute('disabled', '')
      this.domRefs.prev.removeAttribute('disabled', '')
    }
    if (this.options.currentPage === 100) {
      this.domRefs.last.setAttribute('disabled', '')
      this.domRefs.next.setAttribute('disabled', '')
    } else {
      this.domRefs.last.removeAttribute('disabled', '')
      this.domRefs.next.removeAttribute('disabled', '')
    }
  }

  _createNumbers() {
    let {
      currentPage,
      buttonCount,
      totalPage
    } = this.options
    let start1 = Math.max(currentPage - Math.round(buttonCount / 2), 1)
    console.log(start1)
    let end1 = Math.min(start1 + buttonCount - 1, totalPage)
    console.log(end1)
    let end2 = Math.min(currentPage + Math.round(buttonCount / 2) - 1, totalPage)
    console.log(end2)
    let start2 = Math.max(end2 - buttonCount + 1, 1)
    console.log(start2)
    let start = Math.min(start1, start2)
    console.log(start)
    let end = Math.max(end1, end2)
    console.log(end)

    let ol = dom.create(this.options.templates.pageNumbers)
    for (let i = start; i <= end; i++) {
      let li = dom.create(`<li data-page="${i}">${this.options.templates.number.replace('%page%',i)}</li>`)
      if (i === currentPage) {
        li.classList.add('current')
      }
      ol.appendChild(li)
    }
    return ol
  }

  goToPage(page) {
    if (!page || page > this.options.totalPage || page === this.options.currentPage) {
      return
    }
    this.options.currentPage = page
    // this.options.element.dispatchEvent(new CustomEvent('pageChange', { detail: { page } }))
    this.rerender()
  }

  rerender() {
    this._checkButtons()
    let newNumbers = this._createNumbers()
    console.log(newNumbers)
    let oldNumbers = this.domRefs.numbers
    oldNumbers.parentNode.replaceChild(newNumbers, oldNumbers)
    this.domRefs.numbers = newNumbers
  }
}