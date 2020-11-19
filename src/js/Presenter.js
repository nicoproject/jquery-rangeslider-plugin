import Slider from './Model'
import View from './View'

class Presenter {
  constructor() {
    let mockSliderOptions = {
      id: 1,
      step: 20,
      scale: {
        min: 0,
        max: 500,
      },
    }
    this.model = new Slider(mockSliderOptions)
    this.view = new View()

    this.view.moveRunnerEvent.addListener((viewMoveRunner) => {
      this.model.moveRunner(viewMoveRunner)
      this.view.render()
    })
    this.view.getRunnersEvent.addListener((viewGetRunners) => {
      console.log('View.getRunnersEvent triggered: ', this.model.runners)
    })

    this.model.createRunnerEvent.addListener((modelCreateRunner) => {
      this.view.createRunner(this.model.runners)
    })
    this.model.getRunnerEvent.addListener((modelGetRunners) => {
      this.view.setRunners(this.model.runners)
      console.log('Presenter. getRunnerEvent runners: ', this.view.runners)
    })
    this.model.moveRunnerEvent.addListener((modelMoveRunner) => {
      this.view.moveRunner(modelMoveRunner)
    })
  }

  run() {
    this.view.createScale(this.model.scale)
    this.view.setRunners(this.model.runners)
    this.view.render()
  }

  destroy() {}
}

export default Presenter
