import runners from './constants'
import defaultOptions from './defaultOptions'
import Event from './Event'

class Slider {
  constructor(options) {
    // slider props
    // TODO: remove to according file packs i.e.
    // this.scale = new Scale(params)

    // OPTIONS
    if (options) {
      this.options = options
    } else if (typeof defaultOptions !== 'undefined') {
      this.options = { ...defaultOptions }
    } else {
      this.options = {}
    }

    this.id = this.options.id
    this.step = this.options.step
    this.scale = this.options.scale

    // EVENTS COLLECTION, TODO: REFACTOR
    this.createRunnerEvent = new Event()
    this.getRunnerEvent = new Event()
    this.moveRunnerEvent = new Event()
    this.createScale = new Event()

    this.runners = {
      set runners(array) {
        console.log(array)
      },
      get runners() {
        return this.runners
      },
    }
    this.runners = runners

    console.log(this)
  }

  createRunner(runner = {}) {
    this.runners.push(runner)
    this.createRunnerEvent.trigger(runner)
    console.log('Model. createRunner this.runners: ', this.runners)
    return this.runners
  }

  getRunnerPosition() {
    let runnerPosition = this.getRunnerEvent.trigger()
    return runnerPosition
  }

  moveRunner(params = {}) {
    if (params) {
      this.moveRunnerEvent.trigger(params)
      console.log('Model. Move runner by params: ', params)
    }

    return params
  }
}

export default Slider
