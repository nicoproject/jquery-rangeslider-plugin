import Slider from './Model'
import View from './View'

class Presenter {
  constructor() {
    this.model = new Slider()
    this.view = new View()

    this.view.moveRunnerEvent.addListener((move) => {
      this.model.moveRunner(move)
    })

    this.model.moveRunnerEvent.addListener((move) => {
      this.view.moveRunner(move)
    })
  }

  run() {
    this.view.render()
  }

  destroy() {}
}

export default Presenter
