class ViewTooltip {
  constructor($el, state) {
    this.$el = $el
    this.state = state
    // console.log(this)

    this.init()
  }

  init() {
    this.$el.dataset.tooltip = this.state
    return this 
  }
}

export default ViewTooltip
