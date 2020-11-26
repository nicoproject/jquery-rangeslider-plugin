import Slider from './Model'
import View from './View'

class Presenter {
  constructor(modelState) {
    this.model = new Slider(modelState)
    this.view = new View(modelState)

    /** View data state listeners
     *
     */

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
