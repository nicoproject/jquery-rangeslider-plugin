import { convertRange } from './core/utils'
import { setAttributes, createElement } from './core/dom'

import ViewScale from './view_components/ViewScale'
import ViewBar from './view_components/ViewBar'
import ViewTooltip from './view_components/ViewTooltip'
import ViewRunners from './view_components/ViewRunners'

class View {
  constructor(modelState = {}) {
    /** Options */
    this.skin = modelState.options.skin
    this.scale = modelState.options.scale
    this.step = modelState.options.step
    this.runners = modelState.options.runners
    this.bar = modelState.bar
    this.orientation = modelState.options.orientation
    this.range = modelState.range

    /** @todo Refactor define those in ViewScale init */
    this.hasNegative = modelState.hasNegative
    this.isVisible = modelState.options.scale.isVisible

    /** DOM Elements creation/bindings */
    this.$mainWrapper = this.createSliderWrapper()

    /** Store Scale component */
    this._scale = this.createScale()

    /** Prepare Array for Runners Nodes */
    this.$runners = []

    /** Store Bar component */
    this._bar = this.createBar()

    /** Register events
     * @todo Refactor
     */
    /** Link child event to same name Parent Event */
    this.clickScaleEvent = this._scale.clickScaleEvent

    this.render(this.runners)
  }


  /** Render methods */
  /** Creates DOM nodes
   * @todo Refactor receive options object with runners inside
   * @param {*} updatedRunners
   */
  render(updatedRunners) {
    /** Clears Runners nodes to recreate new Runners
     * @todo Move to separate function clearNodes
     * @todo build links to all changeable DOM Elements and change
     * their parameters and rerender only specific element
     * to avoid rerender each mousemove
     */
    if (typeof this.$runners !== 'undefined' && this.$runners.length !== 0) {
      this.$runners.forEach(($node, i) => {
        $node.remove()
        $node = ''
      })
      this.$runners.length = 0
    }
    this.$runners = this.createRunners(updatedRunners)
    this.setTooltips(this.$runners)

    this.$mainWrapper.append(...this.$runners)
  }
  

  /** Slider methods */
  createSliderWrapper() {
    let verticalClass = ''
    if (this.orientation === 'vertical') {
      verticalClass = 'range-slider_vertical'
    }
    const $mainWrapper = document.createElement('div')
    $mainWrapper.className = `range-slider__main-wrapper ${verticalClass} ${this.skin}`
    document.body.appendChild($mainWrapper)
    return $mainWrapper
  }

  /** Scale methods  */
  /** Creates scale element and appends to $parentEl
   * @param {Object} options
   */
  createScale() {
    /** Prepare options obj for Scale render */
    const scaleOptions = {
      $el: this.$mainWrapper,
      min: this.scale.min,
      max: this.scale.max,
      step: this.step,
      orientation: this.orientation,
      range: this.range,
      hasNegative: this.hasNegative,
      isVisible: this.isVisible,
    }

    const scale = new ViewScale(scaleOptions)
    this.$mainWrapper.appendChild(scale.$scaleWrapper)
    return scale
  }

  /** Tooltip methods */
  /** Sets tooltips value and visibility classes
   * @param {HTMLElement} $runners
   */
  setTooltips($runners) {
    $runners.forEach(($runner) => {
      const showTooltip = this.runners[$runner.dataset.id - 1].showTooltip
      // USE OF TOOLTIP CLASS
      const tooltipArgs = {
        $el: $runner,
        state: showTooltip,
      }
      new ViewTooltip(tooltipArgs)
    })
  }

  /** Bar methods  */
  /** Creates Bar element and appends to $parentEl
   * @param {Object} options
   */
  createBar() {
    /** Prepare options obj for Scale render */
    const barOptions = {
      $el: this.$mainWrapper,
      barLength: this.bar.length,
      barStartPoint: this.bar.startPoint,
      orientation: this.orientation,
      range: this.range,
      $scaleWrapper: this._scale.$scaleWrapper,
    }

    const bar = new ViewBar(barOptions)
    // this.$mainWrapper.appendChild(bar.$el)
    return bar
  }

  createRunners() {
    /** Prepare options obj for Runners render */
    const runnersOptions = {
      $el: this.$mainWrapper,
      runners: this.runners,
      orientation: this.orientation,
      range: this.range,
      $scaleWrapper: this._scale.$scaleWrapper,
    }

    this._runners = new ViewRunners(runnersOptions)

    return this._runners.$runners
  }

  // RUNNERS METHODS
  setRunners(modelRunners) {
    this.runners = modelRunners
    return this.runners
  }

}

export default View
