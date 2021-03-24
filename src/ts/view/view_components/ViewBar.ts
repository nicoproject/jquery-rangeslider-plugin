import { createElement, setAttributes } from '../../core/dom'
import { convertRange } from '../../core/utils'
import { IBarOptions } from '../ViewInterfaces'

class ViewBar {
  private $el: any
  private $scaleWrapper: any
  private barLength: number
  private barStartPoint: number
  private orientation: string
  private range: number
  private hasNegative: boolean
  private min: number
  private barLengthInPx: number
  private barStartFromLeft: number

  constructor(args: IBarOptions) {
    /** Set initial values */
    this.$el = args.$el
    this.$scaleWrapper = args.$scaleWrapper
    this.barLength = args.barLength
    this.barStartPoint = args.barStartPoint
    this.orientation = args.orientation
    this.range = args.range
    this.hasNegative = args.hasNegative
    this.min = args.min

    if (this.hasNegative) {
      this.barStartPoint = Math.abs(this.min - this.barStartPoint)
    }

    /** Set calculated values */
    this.barLengthInPx = convertRange(this.getRangeToConvert()) * this.barLength
    this.barStartFromLeft
    if (this.min > 0) {
      this.barStartFromLeft =
        convertRange(this.getRangeToConvert()) * (this.barStartPoint - this.min)
    } else {
      this.barStartFromLeft =
        convertRange(this.getRangeToConvert()) * this.barStartPoint
    }

    this.createBar()
  }

  private getRangeToConvert() {
    return {
      max: this.range,
      pixels:
        this.orientation === 'vertical'
          ? this.$scaleWrapper.offsetHeight
          : this.$scaleWrapper.offsetWidth,
      direction: 'range2pix',
    }
  }

  private createBar() {
    /** Delete existing progress bar before creating new DOM element */
    if (this.$el.$progressBar) {
      this.$el.removeChild(this.$el.$progressBar)
    }

    const $progressBar = createElement('div', 'bar__wrapper') || HTMLElement

    let lengthStyleParam = this.orientation === 'vertical' ? 'height' : 'width'
    let positionStyleParam = this.orientation === 'vertical' ? 'bottom' : 'left'
    setAttributes($progressBar, {
      'data-start-point': this.barStartPoint,
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
}

export default ViewBar
