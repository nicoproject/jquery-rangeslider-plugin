import { createElement, setAttributes } from '../core/dom'
import { convertRange } from '../core/utils'

class ViewBar {
  constructor(args) {
    /** Set initial values */
    this.$el = args.$el || HTMLElement
    this.$scaleWrapper = args.$scaleWrapper
    this.barLength = args.barLength
    this.startPoint = args.barStartPoint
    this.orientation = args.orientation
    this.range = args.range
    this.hasNegative = args.hasNegative
    this.min = args.min

    if (this.hasNegative) {
      this.startPoint = Math.abs(this.min - this.startPoint)
    }

    /** Set calculated values
     * @todo Refactor change variables name barLengthInPx, barStartFromLeft
     * @todo Refactor change methods names - they don't reflect stored values, maybe change logic
     */
    this.barLengthInPx = convertRange(this.getRangeToConvert()) * this.barLength
    this.barStartFromLeft =
      convertRange(this.getRangeToConvert()) * this.startPoint
    this.createBar()
  }

  getRangeToConvert() {
    return {
      max: this.range,
      pixels:
        this.orientation === 'vertical'
          ? this.$scaleWrapper.offsetHeight
          : this.$scaleWrapper.offsetWidth,
      direction: 'range2pix',
    }
  }

  createBar() {
    // this.createBarEvent.trigger()
    /** Delete existing progress bar before creating new DOM element
     * @todo Check if this condition ever fires
     */
    if (this.$el.$progressBar) {
      this.$el.removeChild(this.$el.$progressBar)
    }

    const $progressBar = createElement('div', 'bar__wrapper') || HTMLElement

    let lengthStyleParam = this.orientation === 'vertical' ? 'height' : 'width'
    let positionStyleParam = this.orientation === 'vertical' ? 'bottom' : 'left'
    /** @todo Refactor change variables names */
    setAttributes($progressBar, {
      'data-start-point': this.startPoint,
      'data-length': this.barLength,
      style:
        lengthStyleParam +
        ': ' +
        +this.barLengthInPx +
        'px; ' +
        positionStyleParam +
        ': ' +
        +this.barStartFromLeft +
        'px',
    })

    this.$el.$progressBar = $progressBar

    /** @todo Refactor separate and group all append operations */
    this.$el.appendChild($progressBar)
  }

  updateBar() {}
}

export default ViewBar
