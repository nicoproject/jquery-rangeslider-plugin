import { getClosest } from './core/utils'

import Slider from './Model'
import View from './View'

class Presenter {
  constructor(modelState = {}) {
    this.model = new Slider(modelState)
    this.view = new View(this.model)

    /** View user events listeners
     *
     */

    /** @TODO HEAVY REFACTOR */
    this.view.clickScaleEvent.addListener((clickViewScale) => {
      let runnersPositionsArray = this.model.runners
      runnersPositionsArray = runnersPositionsArray.map(
        (element) => element.position
      )

      let closestRunner = getClosest(runnersPositionsArray, clickViewScale)
      closestRunner = this.model.runners.find(
        (runner) => runner.position === closestRunner
      )
      closestRunner.position = clickViewScale
      this.view.$runners.$runners[closestRunner.id - 1].moveRunner({
        id: closestRunner.id - 1,
        position: closestRunner.position,
      })
      
      let bar = this.model.createBar()
      this.view.bar = bar
      this.view.createBar()
    })

    this.view.moveRunnerEvent.addListener((moveViewRunner) => {
      this.model.runners[moveViewRunner.id - 1].position =
        moveViewRunner.position
      this.model.runners = this.model.setupRunners(this.model.runners)
      this.model.bar = this.model.createBar()
      this.view.bar = this.model.bar
      this.view.createBar()
    })

    /** Model data state listeners
     *
     */

    /** Check if model ready
     * @todo Delegate to Jest and TS
     */
    this.model.init()
  }

  /** Runs the app
   *  @todo Refactor all
   */
  run() {}

  destroy() {}
}

export default Presenter
