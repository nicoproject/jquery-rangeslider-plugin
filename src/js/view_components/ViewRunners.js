import Event from '../Event'
import ViewRunner from './ViewRunner'

class ViewRunners {
  /** @todo Add check for empty input w throw Error */
  constructor(options = {}) {
    /** Set initial values */
    this.$el = options.$el
    this.runners = options.runners
    this.orientation = options.orientation
    this.range = options.range
    this.$scaleWrapper = options.$scaleWrapper
    this.$runners = []
    this.hasNegative = options.hasNegative
    this.min = options.min
    this.step = options.step

    //** Set calculated initial values */
    this.$runners = this.createRunners(this.runners)

    /** Register events collection
     * @todo Refactor
     */
    this.moveRunnerEvent = new Event()

    /** Register listeners for runners */
    this.$runners.forEach(($runner) => {
      $runner.moveRunnerEvent.addListener((ViewRunnerClickEvent) => {
        this.moveRunnerEvent.trigger(ViewRunnerClickEvent)
      })
    })

    this.render()
  }

  /** Appends runners DOM nodes to wrapper
   * @param {Object} runners
   */ render() {
    this.$runners.forEach(($runner) => {
      this.$el.appendChild($runner.$el)
      // this.correctRunnerPosition($runner.$el)
    })
  }

  /** Creates and returns Runners DOM nodes in array
   * @param {Object} runners
   */
  createRunners(runners = []) {
    runners.forEach(($runner) => {
      let runnerArgs = {
        orientation: this.orientation,
        id: $runner.id,
        position: $runner.position,
        tooltip: $runner.showTooltip,
        range: this.range,
        $scaleWrapper: this.$scaleWrapper,
        hasNegative: this.hasNegative,
        min: this.min,
        step: this.step,
      }
      this.$runners.push(new ViewRunner(runnerArgs))
    })

    return this.$runners
  }

  /** Corrects runners positions by their half-length size
   * @param {HTMLElement} $el
   */
  correctRunnerPosition($el) {
    const correctLength = $el.offsetWidth / 2
    
    $el.style.left = correctLength * -1 + 'px'
  }
}

export default ViewRunners
