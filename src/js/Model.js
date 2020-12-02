import defaultOptions from './defaultOptions'
import Event from './Event'

class Slider {
  constructor(options) {
    /** Validate incoming Options array
     *  @todo Remove to utils
     */
    if (options) {
      this.options = options
    } else if (typeof defaultOptions !== 'undefined') {
      this.options = { ...defaultOptions }
    } else {
      this.options = {}
    }

    /** Set initial options */
    this.id = this.options.id
    this.step = this.options.step
    this.scale = this.options.scale

    /** Set additional (calculated) options */
    this.hasNegative = this.hasNegative()
    this.range = this.calculateRange()
    this.runners = this.setupRunners(this.options.runners)
    this.bar = this.createBar()

    /** Register events collection
     * @todo Refactor
     */
    this.createBarEvent = new Event()
  }

  // ------------ CLASS METHODS --------------

  /** Tests if  Model.Options are set and Presenters.Listeners are ready
   *  @method init()
   *  @todo Delegate all initial tests to Jest test instead of console
   */
  init() {
    console.log('Model. Initiated: ', this)
  }

  setupRunners(arr = []) {
    arr.forEach((runner) => {
      this.validateRunnerPosition(runner)
    })
    arr = this.sortRunnersByPosition(arr)
    return arr
  }

  validateRunnerPosition(obj = {}) {
    const isRunnerOnScale = obj.position < this.scale.max && obj.position > this.scale.min
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

  /** Creates Bar object, by sorting runners and defining startPoint and width
   * @todo Refactor with use of variable instead of this.runners[lastIndex].position
   * @todo Refactor separate sort function
   */
  createBar() {
    let bar
    if (this.runners.length >= 2) {
      const lastIndex = this.runners.length - 1
      bar = {
        width: +this.runners[lastIndex].position - +this.runners[0].position,
        startPoint: +this.runners[0].position,
      }
    } else if (this.runners.length < 2) {
      bar = {
        width: this.runners[0].position - this.options.scale.min,
        startPoint: 0,
      }
    } else if (typeof this.bar === 'undefined') {
      bar = {
        width: 200,
        startPoint: 0,
      }
    }
    return bar
  }

  /** Returns true if scale has negative values */
  hasNegative() {
    return this.options.scale.min < 0 || this.options.scale.max < 0
  }

  /** Returns range value
   * @todo Separate if conditions
   */
  calculateRange() {
    const min = this.options.scale.min
    const max = this.options.scale.max
    return this.hasNegative === 'true'
      ? Math.abs(min) + Math.abs(max)
      : max - min
  }
}

export default Slider
