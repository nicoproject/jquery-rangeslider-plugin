import Slider from './Model'
import View from './View'

class Presenter {
  constructor(modelState = {}) {
    this.model = new Slider(modelState)
    this.view = new View(this.model)

    console.log('1', this.view)
    /** View user events listeners
     *
     */
    this.view.clickScaleEvent.addListener((clickViewScale) => {
      console.log('Presenter. view,clickViewScale: ', clickViewScale)
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
  run() {
  }

  destroy() {}
}

export default Presenter
