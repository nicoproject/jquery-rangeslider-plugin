import defaultOptions from '../defaultOptions'
import Event from '../Event'

class Slider {
  constructor(options = {}) {
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

  setupRunners(arr = []) {
    arr.forEach((runner) => {
      this.validateRunnerPosition(runner)
    })
    arr = this.sortRunnersByPosition(arr)
    return arr
  }

  validateRunnerPosition(obj = {}) {
    const isRunnerOnScale =
      obj.position <= this.scale.max && obj.position > this.scale.min
    if (!isRunnerOnScale) {
      obj.position = 0
      return
    }
  }

  sortRunnersByPosition(arr) {
    return arr.sort((a, b) =>
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
    } else if (typeof this.bar === 'undefined') {
      length = 200
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
    return this.hasNegative === 'true'
      ? Math.abs(min) + Math.abs(max)
      : max - min
  }
}

export default Slider