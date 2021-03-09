import { createElement, setAttributes } from '../../core/dom'
import { convertRange } from '../../core/utils'

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

    /** Set calculated values */
    this.barLengthInPx = convertRange(this.getRangeToConvert()) * this.barLength
    this.barStartFromLeft
    if (this.min > 0) {
      this.barStartFromLeft =
        convertRange(this.getRangeToConvert()) * (this.startPoint - this.min)
    } else {
      this.barStartFromLeft =
        convertRange(this.getRangeToConvert()) * this.startPoint
    }

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
    /** Delete existing progress bar before creating new DOM element */
    if (this.$el.$progressBar) {
      this.$el.removeChild(this.$el.$progressBar)
    }

    const $progressBar = createElement('div', 'bar__wrapper') || HTMLElement

    let lengthStyleParam = this.orientation === 'vertical' ? 'height' : 'width'
    let positionStyleParam = this.orientation === 'vertical' ? 'bottom' : 'left'
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

    this.$el.appendChild($progressBar)
  }

  updateBar() {}
}

export default ViewBar
