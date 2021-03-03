import { getClosest } from './core/utils'

import Slider from './Model'
import View from './View'

class Presenter {
  constructor(modelState = {}) {
    this.model = new Slider(modelState)
    this.view = new View(this.model)

    /** Model data state listeners    */

    /** Check if model ready
     * @todo Delegate to Jest and TS
     */
    this.model.init()

    /** Setup listeners */
    this.setupListeners()
  }

  /** View user events listeners */
  setupListeners() {
    /** Scale has been clicked on
     * @TODO HEAVY REFACTOR */
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
      this.view.$runners.$runners[closestRunner.id - 1].moveRunner(
        closestRunner.position
      )

      this.renderBar() 
    })

    /** Runner has been moved */
    this.view.moveRunnerEvent.addListener((moveViewRunner) => {
      this.model.runners[moveViewRunner.id - 1].position =
        moveViewRunner.position
      this.renderBar() 

    })

    /** Skin has been selected */
    this.view.skinSelectedEvent.addListener((selectSkinPanel) => {
      this.model.options.skin = selectSkinPanel
      this.render()
    })

    /** Orientation has been changed */
    this.view.orientationChangedEvent.addListener((selectOrientationPanel) => {
      this.model.options.orientation = selectOrientationPanel
      this.render()
    })

    /** Step has been changed */
    this.view.stepChangedEvent.addListener((changeStepPanel) => {
      this.model.options.step = changeStepPanel
      this.render()
    })

    /** Min has been changed */
    this.view.minChangedEvent.addListener((changeMinPanel) => {
      this.model.options.scale.min = +changeMinPanel
      this.model.scale.min = +changeMinPanel
      console.log(typeof(+changeMinPanel))
      this.render()
    })

    /** Min has been changed */
    this.view.maxChangedEvent.addListener((changeMaxPanel) => {
      this.model.options.scale.max = +changeMaxPanel
      this.model.scale.max = +changeMaxPanel
      this.render()
    })

    /** Scale  */
  }

  /** Runs the app
   *  @todo Refactor all
   */
  run() {}

  /** Render */
  render() {
    this.view.destroy()
    console.log('destroyed')
    console.log(this.model.scaleHasNegative())
    this.model.hasNegative = this.model.scaleHasNegative()
    this.model.range = this.model.calculateRange()

    this.view = new View(this.model)
    

    this.setupListeners()

    this.renderBar()
    console.log('rendered')
    console.log(this.model)
  }

  renderBar() {
    let bar = this.model.createBar()
    this.view.bar = bar
    this.view.createBar()
  }

  destroy() {}
}

export default Presenter
