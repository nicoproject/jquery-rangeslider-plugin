import { convertRange } from './core/utils'

import ViewScale from './view_components/ViewScale'
import ViewTooltip from './view_components/ViewTooltip'

class View {
  constructor(modelState = {}) {
    /** Options */
    this.skin = modelState.skin
    this.scale = modelState.scale
    this.step = modelState.step
    this.runners = modelState.runners
    this.bar = modelState.bar
    this.orientation = modelState.orientation

    /** DOM Elements creation/bindings */
    this.$mainWrapper = this.createSliderWrapper()
    this.$scale = document.createElement('div')

    /** Prepare options obj for Scale render */
    this.$scaleOptions = {
      $el: this.$mainWrapper,
      min: this.scale.min,
      max: this.scale.max,
      step: this.step,
      orientation: this.orientation,
    }
    this._scale = this.createScale(this.$scaleOptions)

    /** Prepare Array for Runners Nodes */
    this.$runners = []

    /** Register events
     * @todo Refactor
     */
    /** Link child event to same name Parent Event */
    this.clickScaleEvent = this._scale.clickScaleEvent

    this.render(this.runners)
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
  /** Creates scale element and appends to slider
   * @param {} options
   */
  createScale(options = {}) {
    const scale = new ViewScale(options)
    this.$mainWrapper.appendChild(scale.$scaleWrapper)
    return scale
  }

  // TOOLTIP METHODS
  /** Sets tooltips value and visibility classes
   * @param {Node} $runners
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

  // RENDER METHODS
  /** Creates DOM nodes
   * @todo Refactor recieve options object with runners inside
   * @param {*} updatedRunners
   */
  render(updatedRunners) {
    /** Clears Runners nodes to recreate new Runners
     * @todo Move to separate function clearNodes
     * @todo build links to all changeable DOM Elements and change
     * their parameters and rerender only specific element
     * so to avoid rerender each mousemove
     */
    if (typeof this.$runners !== 'undefined' && this.$runners.length !== 0) {
      this.$runners.forEach(($node, i) => {
        $node.remove()
        $node = ''
      })
      this.$runners.length = 0
    }
    this.createRunners(updatedRunners)
    this.setTooltips(this.$runners)

    this.$mainWrapper.append(...this.$runners)
  }

  // BAR METHODS
  createBar(bar) {
    this.createBarEvent.trigger()
    if (this.$mainWrapper.progressBar) {
      this.$mainWrapper.removeChild(this.$mainWrapper.progressBar)
    }

    const progressBar = document.createElement('div')
    progressBar.className = 'bar__wrapper'
    progressBar.dataset.startPoint = bar.startPoint
    progressBar.dataset.width = bar.width

    progressBar.style.width = +bar.width + 'px'
    //TODO REDO FOR CONDITIONAL ORIENTATION
    progressBar.style.left = +bar.startPoint + 'px'

    this.$mainWrapper.progressBar = progressBar
    this.$mainWrapper.appendChild(progressBar)
  }

  // RUNNERS METHODS
  setRunners(modelRunners) {
    this.runners = modelRunners
    return this.runners
  }

  createRunners(
    runners = [
      {
        id: 0,
        position: 0,
        showTooltip: true,
      },
    ]
  ) {
    for (const runner of runners) {
      // TODO: REFACTOR runner = doc.createEl... + this.runners.push(runner)
      const $runner = document.createElement('div')
      $runner.className = `runner runner-id-${runner.id}`
      $runner.dataset.id = runner.id
      $runner.dataset.position = runner.position

      const cssProp = this.orientation === 'vertical' ? 'bottom' : 'left'
      console.log('view for loop this.orientation: ', this.orientation)
      const ccsPropArgs = {
        max: this._scale.range,
        pixels:
          this.orientation === 'vertical'
            ? this._scale.$scaleWrapper.offsetHeight
            : this._scale.$scaleWrapper.offsetWidth,
        clientCoords: 1,
        direction: 'range2pix',
      }
      const runnerPxPosition = runner.position * convertRange(ccsPropArgs)

      $runner.style.setProperty(cssProp, runnerPxPosition + 'px')
      console.log('runnerPxPosition: ', runnerPxPosition)

      $runner.addEventListener('click', (event) => {
        this.boostRunnersEvent.trigger(event.target.dataset.id)
        this.TooltipChangedEvent.trigger(event.target.dataset.id)
      })

      this.$runners.push($runner)
    }
    return this.$runners
  }
}

export default View
