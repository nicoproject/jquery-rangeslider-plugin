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
        return this.options.runners
      },
    }
    this.runners = this.options.runners
    this.id = this.options.id
    this.step = this.options.step
    this.scale = this.options.scale
    this.bar = this.createBar()

    // INIT
    this.init()
  }
  // ------------ CLASS METHODS --------------

  init() {
  }

  // BAR METHODS
  createBar() {
    // SORT RUNNERS ARRAY BY POSITION
    this.runners.sort((a, b) =>
      a.position > b.position ? 1 : b.position > a.position ? -1 : 0
    )
    if (this.runners.length >= 2) {
      let lastIndex = this.runners.length - 1
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
  // RUNNER METHODS
  createRunner(runner = {}) {
    this.runners.push(runner)
    this.createRunnerEvent.trigger(runner)
    return this.runners
  }

  getRunnerPosition() {
    let runnerPosition = this.getRunnerEvent.trigger()
    return runnerPosition
  }

  moveRunner(params = {}) {
    if (params) {
      let id = params.id - 1
      let distance = params.distance
      this.runners[id].position = distance

      this.moveRunnerEvent.trigger(params)

      return this.runners
    }
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
