import defaultOptions from './defaultOptions'
import Event from './Event'

class Slider {
  constructor(options) {
    /** Register events collection
     * @todo Refactor
     */
    this.createBarEvent = new Event()

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
    this.runners = {
      set runners(array) {},
      get runners() {
        return this.options.runners
      },
    }
    this.runners = this.options.runners
    this.id = this.options.id
    this.step = this.options.step
    this.scale = this.options.scale
    this.bar = this.createBar()
  }

  // ------------ CLASS METHODS --------------

  /** Tests if  Model.Options are set and Presenters.Listeners are ready
   *  @method init()
   *  @todo Delegate all initial tests to Jest test instead of console
   */
  init() {
    if (this.runners.length !== 0) {
      console.log('Model. Initiated: ', this)
    }
  }

  /** Creates Bar object, by sorting runners and defining startPoint and width
   * @todo Refactor with use of variable instead of this.runners[lastIndex].position
   */
  createBar() {
    this.runners.sort((a, b) =>
      a.position > b.position ? 1 : b.position > a.position ? -1 : 0
    )

    if (this.runners.length >= 2) {
      const lastIndex = this.runners.length - 1
      this.bar = {
        width: +this.runners[lastIndex].position - +this.runners[0].position,
        startPoint: +this.runners[0].position,
      }
    } else if (this.runners.length < 2) {
      this.bar = {
        width: this.runners[0].position - this.options.scale.min,
        startPoint: 0,
      }
    } else if (typeof this.bar === 'undefined') {
      this.bar = {
        width: 200,
        startPoint: 0,
      }
    }
    this.createBarEvent.trigger(this.bar)
    return this.bar
  }
}

export default Slider
