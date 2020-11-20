import runners from './constants'
import defaultOptions from './defaultOptions'
import Event from './Event'

class Slider {
  constructor(options) {
    // REGISTER EVENTS COLLECTION, TODO: REFACTOR
    this.createRunnerEvent = new Event()
    this.getRunnerEvent = new Event()
    this.moveRunnerEvent = new Event()
    this.boostRunnerEvent = new Event()
    this.createScaleEvent = new Event()
    this.createBarEvent = new Event()

    // OPTIONS
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
        return this.runners
      },
    }
    this.runners = runners

    this.id = this.options.id
    this.step = this.options.step
    this.scale = this.options.scale
    this.bar = this.createBar()

    // INIT
    this.init()

    // console.log(
    //   this.createRunnerEvent,
    //   this.getRunnerEvent,
    //   this.moveRunnerEvent,
    //   this.createScaleEvent,
    //   this.createBarEvent
    // )
    // console.log('Model.constructor this.bar', this.bar)
  }
  // ------------ CLASS METHODS --------------

  init() {
    this.createBarEvent.trigger(this.bar)
    // console.log('Model.init this.bar: ', this.bar)
  }

  // BAR METHODS
  createBar() {
    if (this.runners.length >= 2) {
      let lastIndex = this.runners.length - 1
      this.bar = {
        width: +this.runners[lastIndex].position - +this.runners[0].position,
        startPoint: +this.runners[0].position,
      }
      // this.createBarEvent.trigger(this.bar)
      return this.bar
    } else if (this.runners.length < 2) {
      this.bar = {
        width: this.runners[0].position - this.options.scale.min,
        startPoint: 0,
      }
      // this.createBarEvent.trigger(this.bar)
      return this.bar
    } else if (typeof this.bar === 'undefined') {
      this.bar = {
        width: 200,
        startPoint: 0,
      }
      // this.createBarEvent.trigger(this.bar)
      return this.bar
    }
  }
  // RUNNER METHODS
  createRunner(runner = {}) {
    this.runners.push(runner)
    this.createRunnerEvent.trigger(runner)
    // console.log('Model. createRunner this.runners: ', this.runners)
    return this.runners
  }

  getRunnerPosition() {
    let runnerPosition = this.getRunnerEvent.trigger()
    return runnerPosition
  }

  moveRunner(params = {}) {
    if (params) {
      this.moveRunnerEvent.trigger(params)
      // console.log('Model. Move runner by params: ', params)
    }

    return params
  }

  boostRunner(boostedId) {
    if (typeof boostedId === 'undefined') return
    let boostedRunner = this.runners[boostedId - 1]
    boostedRunner.position = +boostedRunner.position + 15
    this.boostRunnerEvent.trigger()

    // console.log('Model. this.runners: ', this.runners)
    // console.log('Model. boostRunner boostedId: ', boostedId)
    // console.log('Model. boostedRunner: ', boostedRunner)
  }
}

export default Slider
