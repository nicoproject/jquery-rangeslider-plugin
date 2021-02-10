import { convertRange } from './core/utils'
import { setAttributes, createElement } from './core/dom'

import ViewScale from './view_components/ViewScale'
import ViewBar from './view_components/ViewBar'
import ViewTooltip from './view_components/ViewTooltip'
import ViewRunners from './view_components/ViewRunners'
import ViewRunner from './view_components/ViewRunner'

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

    /** Create Runners Nodes from Array  REFACTOR */
    this.$runners = []
    this.$runners = this.createRunners()

    /** Store Scale component */
    this._scale = this.createScale()

    //** Link Runners objects with parent wrapper HTMLelement  */
    this.$runners.$runners.forEach((runner) => {
      runner.$scaleWrapper = this._scale.$scaleWrapper
      runner.moveRunner(runner.position)
    })

    /** Store Bar component */
    this._bar = this.createBar()

    /** Register events
     * @todo Refactor
     */
    /** Link Child Events to same name Parent Events */
    this.clickScaleEvent = this._scale.clickScaleEvent
    this.moveRunnerEvent = this.$runners.moveRunnerEvent

    this.render()
  }

  /** Render methods */
  /** Creates DOM nodes
   * @todo Refactor receive options object with runners inside
   * @param {Object} runners
   */
  render() {}

  /** Slider methods */
  createSliderWrapper() {
    let verticalClass = ''
    if (this.orientation === 'vertical') {
      verticalClass = 'range-slider_vertical'
    }
    const $mainWrapper = createElement(
      'div',
      `range-slider__main-wrapper ${verticalClass} ${this.skin}`
    )
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
      runnerPxSize: {
        width: this.$runners.$runners[0].$el.offsetWidth,
        height: this.$runners.$runners[0].$el.offsetHeight,
      },
    }

    const scale = new ViewScale(scaleOptions)
    this.$mainWrapper.appendChild(scale.$scaleWrapper)
    return scale
  }

  /** Tooltip methods */
  /** Sets tooltips value and visibility classes
   * @param {HTMLElement} $runners
   * @todo Refactor tooltip visibility is handled by CSS (by setting data-attr value)
   * consider if this method with ViewTooltip class still needed
   */
  setTooltips($runners = []) {
    $runners.forEach(($runner) => {
      if (typeof $runner.dataset !== 'undefined') {
        const showTooltip = this.runners[$runner.dataset.id - 1].showTooltip
        // USE OF TOOLTIP CLASS
        const tooltipArgs = {
          $el: $runner,
          state: showTooltip,
        }
        new ViewTooltip(tooltipArgs)
      }
    })
  }

  /** Bar methods  */
  /** Creates Bar element and appends to $parentEl
   * @param {Object} options
   */
  createBar() {
    /** Prepare options obj for Bar render */
    const barOptions = {
      $el: this.$mainWrapper,
      $scaleWrapper: this._scale.$scaleWrapper,
      barLength: this.bar.length,
      barStartPoint: this.bar.startPoint,
      orientation: this.orientation,
      range: this.range,
    }

    const bar = new ViewBar(barOptions)
    return bar
  }

  /** Runners */
  createRunners() {
    /** Prepare options obj for Runners render */
    const runnersOptions = {
      $el: this.$mainWrapper,
      runners: this.runners,
      orientation: this.orientation,
      range: this.range,
      // $scaleWrapper: this._scale.$scaleWrapper,
      hasNegative: this.hasNegative,
      min: this.scale.min,
      step: this.step,
    }

    this.$runners = new ViewRunners(runnersOptions)

    return this.$runners
  }
}

export default View
