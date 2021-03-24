import Event from '../../Event/Event'
import { IEvent, IRunnersOptions, IRunnerOptions } from '../ViewInterfaces'
import ViewRunner from './ViewRunner'

class ViewRunners {
  private $el: HTMLDivElement
  private runners: Array<any>
  private orientation: string
  private range: number
  private $scaleWrapper: HTMLDivElement
  private $runners: Array<any>
  private hasNegative: boolean
  private min: number
  private step: number
  private moveRunnerEvent: IEvent


  constructor(options: IRunnersOptions) {
    if (!options) {
      throw new Error(
        'ViewRunners component critical error: Options Object has to be provided'
      )
    }
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

    /** Set calculated initial values */
    this.$runners = this.createRunners(this.runners)

    /** Register events collection */
    this.moveRunnerEvent = new Event()

    /** Register listeners for runners */
    this.$runners.forEach(($runner) => {
      $runner.moveRunnerEvent.addListener((ViewRunnerClickEvent: () => void) => {
        this.moveRunnerEvent.trigger(ViewRunnerClickEvent)
      })
    })

    this.render()
  }

  /** Appends runners DOM nodes to wrapper
   * @param {Object} runners
   */
  private render() {
    this.$runners.forEach(($runner) => {
      this.$el.appendChild($runner.$el)
    })
  }

  /** Creates and returns Runners DOM nodes in array
   * @param {Object} runners
   */
  private createRunners(runners: Array<IRunnerOptions>) {
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
}

export default ViewRunners
