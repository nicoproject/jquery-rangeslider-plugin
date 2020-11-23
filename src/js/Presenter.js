import Slider from './Model'
import View from './View'

class Presenter {
  constructor(options, skin) {
    this.model = new Slider(options)
    this.view = new View(skin, this.model.options.runners)

    // this.view.barCreatedEvent.addListener((viewGetBar) => {
    //   let bar = this.model.createBar()
    //   this.view.createBar(bar)
    //   this.view.render()
    // })
    this.view.moveRunnerEvent.addListener((viewMoveRunner) => {
      this.model.moveRunner(viewMoveRunner)
    })
    this.view.getRunnersEvent.addListener((viewGetRunners) => {
      // console.log('View.getRunnersEvent triggered: ', this.model.runners)
    })
    this.view.boostRunnersEvent.addListener((viewBoostRunner) => {
      this.model.boostRunner(viewBoostRunner)
      // console.log('Presenter.view triggered viewBoostRunner:', viewBoostRunner )
    })

    this.model.createRunnerEvent.addListener((modelCreateRunner) => {
      this.view.createRunner(this.model.runners)
    })
    this.model.getRunnerEvent.addListener((modelGetRunners) => {
      this.view.setRunners(this.model.runners)
    })
    this.model.moveRunnerEvent.addListener((modelMoveRunner) => {
      this.view.createBar(this.model.createBar())
      this.view.render(this.model.runners)
    })
    this.model.boostRunnerEvent.addListener((modelBoostRunner) => {
      this.view.setRunners(this.model.runners)
      this.view.createBar(this.model.createBar())

      this.view.render(this.view.runners)
    })
    this.model.createBarEvent.addListener((modelCreateBar) => {
      // this.view.bar = this.model.createBar()
      // this.view.createBar(this.view.bar)
      // console.log('Presenter. this.view.bar: ', this.view.bar)
    })
  }

  run() {
    this.view.createScale(this.model.scale)
    this.view.createBar(this.model.bar)
    this.view.setRunners(this.model.runners)
    this.view.render(this.model.runners)
  }

  destroy() {}
}

export default Presenter
