class ViewTooltip {
  constructor(args) {
    this.$el = args.$el
    this.state = args.state

    this.init()
  }

  init() {
    this.$el.dataset.tooltip = this.state
    return this 
  }
}

export default ViewTooltip
