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
      console.log('this.model.runners: ', this.model.runners)
      let runnersPositionsArray = this.model.runners
      runnersPositionsArray = runnersPositionsArray.map(
        (element) => element.position
      )

      console.log('runnersPositionsArray: ', runnersPositionsArray)

      let closestRunner = getClosest(runnersPositionsArray, clickViewScale)
      closestRunner = this.model.runners.find(
        (runner) => runner.position === closestRunner
      )
      console.log('Presenter closestRunner: ', closestRunner)
      closestRunner.position = clickViewScale
      console.log(
        'this.view.$runners.$runners[closestRunner.id]',
        closestRunner
      )
      this.view.$runners.$runners[closestRunner.id - 1].moveRunner({
        id: closestRunner.id - 1,
        position: closestRunner.position,
      })
      let bar = this.model.createBar()
      this.view.bar = bar
      this.view.createBar()
      console.log('Presenter bar', this.view)

      console.log('Presenter arr', closestRunner)
    })

    this.view.moveRunnerEvent.addListener((moveViewRunner) => {
      this.model.runners[moveViewRunner.id - 1].position =
        moveViewRunner.position
      this.model.runners = this.model.setupRunners(this.model.runners)
      this.model.bar = this.model.createBar()
      this.view.bar = this.model.bar
      console.log('Presenter view.bar: ', this.view.bar)
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
