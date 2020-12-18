import { createElement, setAttributes } from '../core/dom'
import { debounce, convertRange } from '../core/utils'
import Event from '../Event'

class ViewRunner {
  constructor(args = {}) {
    /** Set initial values */
    this.orientation = args.orientation
    this.id = args.id
    this.position = args.position
    this.showTooltip = args.tooltip
    this.range = args.range
    this.$scaleWrapper = args.$scaleWrapper
    this.hasNegative = args.hasNegative
    this.min = args.min

    /** Set calculated values */
    this.createRunner()

    // add event listener
    this.$el.addEventListener('mousedown', this.onmousedown)

    /** Register events collection
     * @todo Refactor
     */
    this.moveRunnerEvent = new Event()

    /** Debounce heavy function, to execute once in 5 ms */
    this.onmousemove = debounce(this.onmousemove, 5)
  }

  createRunner() {
    /** Creates div, sets data-attributes */
    const $runner = createElement('div', `runner runner-id-${this.id}`)
    setAttributes($runner, {
      'data-id': this.id,
      'data-position': this.position,
      'data-tooltip': this.showTooltip,
    })

    this.$el = $runner

    this.moveRunner(this.position)
  }

  // event listeners, with arrow functions
  onmousedown = (event) => {
    document.addEventListener('mousemove', this.onmousemove)
    document.addEventListener('mouseup', this.onmouseup)
  }

  /** Drag and Drop
   *  @todo check and unite this.orientation === 'vertical' conditions
   */
  onmousemove = (event) => {
    event.preventDefault()
    const runnerPropArgs = {
      max: this.range,
      pixels:
        this.orientation === 'vertical'
          ? this.$scaleWrapper.offsetHeight
          : this.$scaleWrapper.offsetWidth,
      direction: 'pix2range',
    }

    /** 
     * @todo Move to separate function get axisValue, validateAxisValue 
     * @todo HEAVY REFACTOR
    */
    let axisValue =
      this.orientation === 'vertical'
        ? Math.abs(event.pageY - runnerPropArgs.pixels)
        : event.pageX

    if (axisValue > runnerPropArgs.pixels - 75) {
      axisValue = runnerPropArgs.pixels - 75
    } else if (axisValue < 0) {
      axisValue = 0
    } 

    let newRunnerPosition = axisValue * convertRange(runnerPropArgs)

    if (this.hasNegative) {
      newRunnerPosition = this.min + newRunnerPosition
    }

    if (event.pageY > runnerPropArgs.pixels) {
      newRunnerPosition = this.min
    }

    this.$el.dataset.position = newRunnerPosition.toFixed(2)
    
    this.moveRunner(newRunnerPosition)
  }

  moveRunner(runnerPosition) {
    const movePropArgs = {
      max: this.range,
      pixels:
        this.orientation === 'vertical'
          ? this.$scaleWrapper.offsetHeight
          : this.$scaleWrapper.offsetWidth,
      direction: 'range2pix',
    }

    let runnerPxPosition = runnerPosition * convertRange(movePropArgs)

    if (this.hasNegative) {
      const correctNegative = Math.abs(this.min * convertRange(movePropArgs))
      runnerPxPosition = correctNegative + runnerPxPosition
      console.log('ViewRunner runnerPxPosition:', runnerPxPosition)
    }

    if (this.orientation === 'vertical') {
      this.$el.style.bottom = runnerPxPosition + 'px'
    } else {
      this.$el.style.left = runnerPxPosition + 'px'
    }
  }

  onmouseup = () => {
    // console.log('ViewRunner onMouseup: ', event)
    let $runnerParams = {
      Event: this.moveRunnerEvent,
      id: this.id,
      position: +this.$el.dataset.position,
    }
    this.moveRunnerEvent.trigger($runnerParams)

    document.removeEventListener('mousemove', this.onmousemove)
    document.removeEventListener('mouseup', this.onmouseup)
  }

  ondragstart = () => {
    return false
  }
}

export default ViewRunner
