import { createElement } from '../core/dom'

import ViewScale from './view_components/ViewScale'
import ViewBar from './view_components/ViewBar'
import ViewRunners from './view_components/ViewRunners'
import ViewPanel from './view_components/ViewPanel'
import { IEvent, IModelStateOptions, IRunnerOptions } from './ViewInterfaces'

class View {
  private $parentEl: HTMLElement
  private skin: string
  private scale: any
  private step: number
  private runners: Array<object>
  private bar: any
  private orientation: string
  private range: number
  private hasNegative: boolean
  private scaleVisible: boolean
  private $mainWrapper: HTMLDivElement
  private $runners: any
  private _scale: any
  private _bar: object
  private $controlPanel: any

  private clickScaleEvent: IEvent
  private moveRunnerEvent: IEvent
  private skinSelectedEvent: IEvent
  private orientationChangedEvent: IEvent
  private stepChangedEvent: IEvent
  private minChangedEvent: IEvent
  private maxChangedEvent: IEvent
  private visibilityChangedEvent: IEvent
  private runnerChosenEvent: IEvent
  private positionChangedEvent: IEvent
  private tooltipChangedEvent: IEvent

  constructor(modelState: IModelStateOptions, $parentEl: HTMLElement) {
    /** Options */
    this.$parentEl = $parentEl
    this.skin = modelState.options.skin
    this.scale = modelState.options.scale
    this.step = modelState.options.step
    this.runners = modelState.options.runners
    this.bar = modelState.bar
    this.orientation = modelState.options.orientation
    this.range = modelState.range
    this.hasNegative = modelState.hasNegative
    this.scaleVisible = modelState.options.scale.isVisible

    /** DOM Elements creation/bindings */
    this.$mainWrapper = this.createSliderWrapper()

    /** Create Runners Nodes from Array  REFACTOR */
    this.$runners = []
    this.$runners = this.createRunners()

    /** Store Scale component */
    this._scale = this.createScale()

    /** Link Runners objects with parent wrapper HTMLelement  */
    this.$runners.$runners.forEach((runner: IRunnerOptions) => {
      runner.$scaleWrapper = this._scale.$scaleWrapper
      runner.moveRunner(runner.position)
    })

    /** Store Bar component */
    this._bar = this.createBar()

    /** Control Panel component */
    this.$controlPanel = this.createPanel()

    /** Register events */
    this.clickScaleEvent = this._scale.clickScaleEvent
    this.moveRunnerEvent = this.$runners.moveRunnerEvent
    this.skinSelectedEvent = this.$controlPanel.skinPanelEvent
    this.orientationChangedEvent = this.$controlPanel.orientationPanelEvent
    this.stepChangedEvent = this.$controlPanel.stepPanelEvent
    this.minChangedEvent = this.$controlPanel.minPanelEvent
    this.maxChangedEvent = this.$controlPanel.maxPanelEvent
    this.visibilityChangedEvent = this.$controlPanel.visibilityPanelEvent
    this.runnerChosenEvent = this.$controlPanel.runnersIdPanelEvent
    this.positionChangedEvent = this.$controlPanel.positionPanelEvent
    this.tooltipChangedEvent = this.$controlPanel.tooltipPanelEvent
  }

  /** Slider methods */
  private createSliderWrapper() {
    let verticalClass = ''
    if (this.orientation === 'vertical') {
      verticalClass = 'range-slider_vertical'
    }
    const $mainWrapper = createElement(
      'div',
      `range-slider__main-wrapper ${verticalClass} ${this.skin}`
    )
    this.$parentEl.appendChild($mainWrapper)
    return $mainWrapper
  }

  /** Scale methods  */
  /** Creates scale element and appends to $parentEl
   * @param {Object} options
   */
  private createScale() {
    /** Prepare options obj for Scale render */
    const scaleOptions = {
      $el: this.$mainWrapper,
      min: this.scale.min,
      max: this.scale.max,
      step: this.step,
      orientation: this.orientation,
      range: this.range,
      hasNegative: this.hasNegative,
      scaleVisible: this.scaleVisible,
      runnerPxSize: {
        width: this.$runners.$runners[0].$el.offsetWidth,
        height: this.$runners.$runners[0].$el.offsetHeight,
      },
    }

    const scale = new ViewScale(scaleOptions)
    this.$mainWrapper.appendChild(scale.$scaleWrapper)
    return scale
  }

  /** Bar methods  */
  /** Creates Bar element and appends to $parentEl
   * @param {Object} options
   */
  private createBar() {
    /** Prepare options obj for Bar render */
    const barOptions = {
      $el: this.$mainWrapper,
      $scaleWrapper: this._scale.$scaleWrapper,
      barLength: this.bar.length,
      barStartPoint: this.bar.startPoint,
      orientation: this.orientation,
      range: this.range,
      hasNegative: this.hasNegative,
      min: this.scale.min,
    }

    const bar = new ViewBar(barOptions)
    return bar
  }

  /** Runners */
  private createRunners() {
    /** Prepare options obj for Runners render */
    const runnersOptions = {
      $el: this.$mainWrapper,
      runners: this.runners,
      orientation: this.orientation,
      range: this.range,
      hasNegative: this.hasNegative,
      min: this.scale.min,
      step: this.step,
    }

    this.$runners = new ViewRunners(runnersOptions)

    return this.$runners
  }

  /** Control Panel */
  private createPanel() {
    const panelOptions = {
      $el: this.$mainWrapper,
      skin: this.skin,
      orientation: this.orientation,
      step: this.step,
      min: this.scale.min,
      max: this.scale.max,
      scaleVisible: this.scaleVisible,
      runners: this.runners,
    }

    this.$controlPanel = new ViewPanel(panelOptions)
    return this.$controlPanel
  }

  /** Destroy Slider View  */
  private destroy() {
    this.$mainWrapper.remove()
  }
}

export default View
