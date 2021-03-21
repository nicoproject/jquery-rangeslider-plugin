import defaultOptions from '../defaultOptions'
import { IModelOptions, IRunnersArray } from '../view/ViewInterfaces'

class Slider {
  options: IModelOptions
  id: number
  step: number
  scale: {
    min: number
    max: number
  }
  orientation: string
  skin: string
  hasNegative: boolean
  range: number
  runners: Array<IRunnersArray>
  bar: {
    length: number
    startPoint: number
    orientation: string
  }
  constructor(options: IModelOptions) {
    /** Validate incoming Options array
     *  @param {Object} options
     */
    if (options) {
      this.options = options
    } else if (typeof defaultOptions !== 'undefined') {
      this.options = { ...defaultOptions }
    }

    /** Set initial options */
    this.id = this.options.id
    this.step = this.options.step
    this.scale = this.options.scale
    this.skin = this.options.skin
    this.orientation = this.options.orientation

    /** Set additional (calculated) options */
    this.hasNegative = this.scaleHasNegative()
    this.range = this.calculateRange()
    this.runners = this.setupRunners(this.options.runners)
    this.bar = this.createBar()
  }

  /** ------------ CLASS METHODS -------------- */

  /** RUNNERS -------------------------------------------------*/

  setupRunners(arr: Array<IRunnersArray>) {
    arr.forEach((runner) => {
      this.validateRunnerPosition(runner)
    })
    arr = this.sortRunnersByPosition(arr)
    return arr
  }

  validateRunnerPosition(obj: {position: number}) {
    const isRunnerOnScale =
      obj.position <= this.scale.max && obj.position > this.scale.min
    if (!isRunnerOnScale) {
      obj.position = this.scale.min
      return obj.position
    }
  }

  sortRunnersByPosition(arr: Array<IRunnersArray>) {
    return arr.sort((a: IRunnersArray, b: IRunnersArray) =>
      a.position > b.position ? 1 : b.position > a.position ? -1 : 0
    )
  }

  /** Returns Bar object, calculated  startPoint, length, passed orientation */
  createBar() {
    let length
    let startPoint = 0

    let minRunner = this.runners.reduce(function (prev, curr) {
      return prev.position < curr.position ? prev : curr
    })
    let maxRunner = this.runners.reduce(function (prev, curr) {
      return prev.position > curr.position ? prev : curr
    })

    if (this.runners.length >= 2) {
      length = maxRunner.position - minRunner.position
      startPoint = minRunner.position
    } else if (this.runners.length < 2) {
      length = minRunner.position - this.options.scale.min
    // } else if (typeof this.bar === 'undefined') {
      // length = 200
    }
    return {
      length,
      startPoint,
      orientation: this.orientation,
    }
  }

  /** SCALE ------------------------------------------------- */

  /** Returns true if scale has negative values */
  scaleHasNegative() {
    return this.options.scale.min < 0 || this.options.scale.max < 0
  }

  /** Returns range value */
  calculateRange() {
    const min = this.options.scale.min
    const max = this.options.scale.max
    switch (this.hasNegative) {
      case true:
        return Math.abs(min) + Math.abs(max)
      case false:
        return max - min
    }
  }
}

export default Slider
