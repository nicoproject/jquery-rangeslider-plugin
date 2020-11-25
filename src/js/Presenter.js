import Slider from './Model'
import View from './View'

class Presenter {
  constructor(modelOptions, viewData) {
    this.model = new Slider(modelOptions)
    this.view = new View(viewData)

    // VIEW EVENTS LISTENING
    this.view.TooltipChangedEvent.addListener((TooltipChangedEvent) => {
      console.log('TooltipChangedEvent:', TooltipChangedEvent)
    })

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
    this.model.initTooltipEvent.addListener((initMessage) => {
      console.log(initMessage)
      console.log(this.model.runners)
    })
    this.model.getRunnerEvent.addListener((modelGetRunners) => {
      this.view.setRunners(this.model.runners)
    })
    this.model.moveRunnerEvent.addListener((modelMoveRunner) => {
      this.view.createBar(this.model.createBar())
      this.view.render(this.model.runners)
    })
    this.model.createBarEvent.addListener((modelCreateBar) => {})


    // CHECK MODEL SETTING
    this.model.init()
    

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
