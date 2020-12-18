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

    /** Store Scale component */
    this._scale = this.createScale()

    /** Create Runners Nodes from Array  REFACTOR */
    this.$runners = []
    this.$runners = this.createRunners()
    // this.bindRunnerClickEvent(this.$runners)

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
  render() {
    /** Clears Runners nodes to recreate new Runners
     * @todo Move to separate function clearNodes
     * @todo build links to all changeable DOM Elements and change
     * their parameters and rerender only specific element
     * to avoid rerender each mousemove
     */

    // if (typeof this.$runners !== 'undefined' && this.$runners.length !== 0 ) {
    //   this.$runners.forEach(($node, i) => {
    //     console.log('typeof $node' + i, typeof $node)
    //     if (typeof $node === 'HTMLElement') {
    //       $node.remove()
    //       $node = ''
    //     }
    //   })
    //   this.$runners.length = 0
    // }

    // this.setTooltips(this.$runners)
    // this.$mainWrapper.append(...this.$runners)
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
    /** Scale should always be removed before render */
    // if (typeof this._scale !== 'undefined') {
    //   this.$el.removeChild(this._scale.$scaleWrapper)
    // }


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
    // this.$mainWrapper.appendChild(bar.$el)
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
      $scaleWrapper: this._scale.$scaleWrapper,
      hasNegative: this.hasNegative,
      min: this.scale.min,
    }

    this.$runners = new ViewRunners(runnersOptions)

    return this.$runners
  }

  /** Bind Drag&Drop handler
   * @todo Refactor separate omMouseUp function to this - class scope
   */
  bindRunnerClickEvent($runners = []) {
    $runners.forEach(($runner) => {
      const $runnerOptions = {
        $el: $runner,
        orientation: this.orientation,
        showTooltip: $runner.dataset.tooltip,
      }

      $runner = new ViewRunner($runnerOptions)
      this.$runners.push($runner)
    })
    return this.$runners
  }
}

export default View
