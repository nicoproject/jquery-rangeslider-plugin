import Event from './Event'

class Slider {
  constructor() {
    this.moveRunnerEvent = new Event()
  }

  moveRunner(step) {
    console.log('Model. Move runner by step: ', step)

    if (step) {
      this.moveRunnerEvent.trigger(step)
    }

    return step
  }

}

export default Slider
