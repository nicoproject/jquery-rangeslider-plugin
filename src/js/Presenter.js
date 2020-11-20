import Slider from './Model'
import View from './View'

class Presenter {
  constructor() {
    let mockSliderOptions = {
      id: 1,
      step: 20,
      scale: {
        min: 0,
        max: 700,
      },
      type: 'single',
      orientation: 'horizontal',
      skin: 'city',
    }
    this.model = new Slider(mockSliderOptions)
    this.view = new View()

    this.view.moveRunnerEvent.addListener((viewMoveRunner) => {
      this.model.moveRunner(viewMoveRunner)
      this.view.render()
    })
    this.view.getRunnersEvent.addListener((viewGetRunners) => {
      // console.log('View.getRunnersEvent triggered: ', this.model.runners)
    })

    this.view.boostRunnersEvent.addListener((viewBoostRunner) => {
      this.model.boostRunner(viewBoostRunner)
      console.log('Presenter.view triggered viewBoostRunner:', viewBoostRunner )
    })

    this.model.createRunnerEvent.addListener((modelCreateRunner) => {
      this.view.createRunner(this.model.runners)
    })
    this.model.getRunnerEvent.addListener((modelGetRunners) => {
      this.view.setRunners(this.model.runners)
      // console.log('Presenter. getRunnerEvent runners: ', this.view.runners)
    })
    this.model.moveRunnerEvent.addListener((modelMoveRunner) => {
      this.view.moveRunner(modelMoveRunner)
    })
    this.model.boostRunnerEvent.addListener((modelBoostRunner) => {
      console.log('Presenter.model triggered modelBoost Runner', this.model.runners)
      // this.view.runners = this.model.runners
      this.view.setRunners(this.model.runners)
      console.log('Presenter.model setRunners this.view.runners: ', this.view.runners )
      this.view.render(this.view.runners)
    })
    this.model.createBarEvent.addListener((modelCreateBar) => {
      this.view.bar = this.model.createBar()
      this.view.createBar(this.view.bar)
      // console.log('Presenter. this.view.bar: ', this.view.bar)
    })

    // console.log(this)
  }

  run() {
    this.model.init()
    this.view.createScale(this.model.scale)
    this.view.createBar(this.model.bar)
    this.view.setRunners(this.model.runners)
    this.view.render(this.model.runners)
  }

  destroy() {}
}

export default Presenter
