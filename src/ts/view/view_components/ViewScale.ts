import { drawRuler } from './ViewScale.functions'
import Event from '../../Event'
import { createElement, setAttributes } from '../../core/dom'
import { convertRange } from '../../core/utils'
import { IEvent, IScaleOptions } from '../ViewInterfaces'

class ViewScale {
  clickScaleEvent: IEvent
  $el: HTMLElement
  min: number
  max: number
  isVisible: boolean
  step: number
  orientation: string
  range: number
  hasNegative: boolean
  $canvas: HTMLCanvasElement
  lineWidth: number
  context: CanvasRenderingContext2D
  runnerPxSize: number
  scaleLength: number
  intervalCount: number
  spacing: string
  $scaleWrapper: HTMLElement
  clientCoordsArgs: {
    max: number
    pixels: number
    direction: string
  }
  drawRuler: any

  /** Creates scale with canvas ruler from options object */
  constructor(options: IScaleOptions) {
    if (!options) {
      throw new Error(
        'ViewScale component critical error: Options Object has to be provided'
      )
    }
    /** Register events collection */
    this.clickScaleEvent = new Event()

    /** Set initial received options values */
    this.$el = options.$el
    this.min = options.min
    this.max = options.max
    this.isVisible = options.scaleVisible
    this.step = options.step
    this.orientation = options.orientation
    this.range = options.range
    this.hasNegative = options.hasNegative

    /** Set calculated options values and create DOM elements */
    this.$canvas = createElement('canvas', 'scale__ruler')
    this.lineWidth = 1
    this.context = this.$canvas.getContext('2d')
    this.context.lineWidth = this.lineWidth
    this.context.strokeStyle = '#ff000'

    this.runnerPxSize =
      this.orientation === 'vertical'
        ? options.runnerPxSize.height
        : options.runnerPxSize.width

    this.scaleLength = this.getScaleLength(this.$el)
    this.intervalCount = this.getIntervalCount()
    this.spacing = (this.scaleLength / this.intervalCount).toFixed()
    this.$scaleWrapper = this.createScaleWrapper()
    this.clientCoordsArgs = {
      max: this.range,
      pixels:
        this.orientation === 'vertical'
          ? this.$el.offsetHeight
          : this.$el.offsetWidth,
      direction: 'pix2range',
    }
    if (this.isVisible) {
      this.bindScaleWrapperClick()
    }
    /** Explicit this binding to drawRuler function */
    this.drawRuler = drawRuler

    this.init()
  }

  init() {
    if (this.$el.tagName !== 'DIV') {
      throw new Error('Scale parent element should be provided')
    } else if (this.isVisible) {
      this.render()
    }
  }

  render() {
    this.drawRuler({ $el: this.$el, orientation: this.orientation })
    this.$scaleWrapper.append(this.$canvas)
  }

  getScaleLength($parentEl: HTMLElement) {
    return this.orientation === 'vertical'
      ? $parentEl.offsetHeight
      : $parentEl.offsetWidth
  }

  getIntervalCount() {
    let intervalCount = this.range / this.step
    return intervalCount >= 20 ? (intervalCount = 20) : intervalCount
  }

  createScaleWrapper() {
    let $scaleWrapper = createElement('div', 'scale__wrapper')

    setAttributes($scaleWrapper, {
      'data-min': this.min,
      'data-max': this.max,
      'data-step': this.step,
    })

    return $scaleWrapper
  }

  bindScaleWrapperClick() {
    this.$scaleWrapper.addEventListener('click', (event) => {
      /** For vertical orientation make scale Y coords upside down (inverted) */
      const clientCoords =
        this.orientation === 'vertical'
          ? Math.abs(event.offsetY - this.clientCoordsArgs.pixels)
          : event.offsetX
/** @todo Remove implicit type */
      let clickPoint =
        this.min +
        Number((convertRange(this.clientCoordsArgs) * clientCoords).toFixed())

      this.clickScaleEvent.trigger({clickPoint})
    })
  }
}

export default ViewScale
