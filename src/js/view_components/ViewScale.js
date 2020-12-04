import { createElement, setAttributes } from '../core/dom'
import Event from '../Event'
import { drawRuler } from './ViewScale.functions'

class ViewScale {
  /** Creates scale with canvas ruler from options object
   * @param {} options
   * @todo Validate options, provide defaults if empty/undefined
   */
  constructor(options = {}) {
    /** Register events collection
     * @todo Refactor
     */
    this.clickScaleEvent = new Event()

    /** Set initial options values */
    this.$el = options.$el
    this.min = options.min
    this.max = options.max
    this.isVisible = options.isVisible
    this.step = options.step
    this.orientation = options.orientation
    this.range = options.range
    this.hasNegative = options.hasNegative
    this.$canvas = createElement('canvas', 'scale__ruler')
    this.lineWidth = 1
    this.context = this.$canvas.getContext('2d')
    this.context.lineWidth = this.lineWidth
    this.context.strokeStyle = '#ff000'

    /** Set calculated options values */
    this.scaleLength = this.getScaleLength(this.$el)
    this.intervalCount = this.getIntervalCount()
    this.spacing = (this.scaleLength / this.intervalCount).toFixed()

    /** Implicit this binding to drawRuler function */
    this.drawRuler = drawRuler

    this.init()
  }

  init() {
    this.createScaleWrapper()
    if (this.isVisible) {
      this.drawRuler({ $el: this.$el, orientation: this.orientation })
    }
    this.$scaleWrapper.append(this.$canvas)
  }

  createScaleWrapper() {
    this.$scaleWrapper = createElement('div', 'scale__wrapper')

    setAttributes(this.$scaleWrapper, {
      'data-min': this.min,
      'data-max': this.max,
      'data-step': this.step,
    })

    this.$scaleWrapper.addEventListener('click', (event) => {
      const clientCoords =
        this.orientation === 'vertical' ? event.clientY : event.clientX

      this.clickScaleEvent.trigger({
        clientCoords,
        orientation: this.orientation,
      })
    })
  }

  getScaleLength($parentEl) {
    return this.orientation === 'vertical'
      ? $parentEl.offsetHeight
      : $parentEl.offsetWidth
  }

  getIntervalCount() {
    let intervalCount = this.range / this.step
    return intervalCount >= 20 ? (intervalCount = 20) : intervalCount
  }
}

export default ViewScale
