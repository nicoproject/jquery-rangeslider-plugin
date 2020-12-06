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

    /** Set calculated values */
    this.createRunner()

    // add event listener
    this.$el.addEventListener('mousedown', this.onmousedown)

    /** Register events collection
     * @todo Refactor
     */
    this.moveRunnerEvent = new Event()
  }

  createRunner() {
    /** Creates div, sets data-attributes */
    const $runner = createElement('div', `runner runner-id-${this.id}`)
    setAttributes($runner, {
      'data-id': this.id,
      'data-position': this.position,
      'data-tooltip': this.showTooltip,
    })

    /**
     * @todo Refactor separate this block to own function
     * @todo Refactor unite this.orientation check operations
     */
    const cssProp = this.orientation === 'vertical' ? 'bottom' : 'left'

    const ccsPropArgs = {
      max: this.range,
      pixels:
        this.orientation === 'vertical'
          ? this.$scaleWrapper.offsetHeight
          : this.$scaleWrapper.offsetWidth,
      direction: 'range2pix',
    }

    /** Defines runner position converted to px on scale  */
    const runnerPxPosition = this.position * convertRange(ccsPropArgs)

    /** Sets runner position
     * @todo Refactor move $runner with appropriate method
     */
    $runner.style.setProperty(cssProp, runnerPxPosition + 'px')

    this.$el = $runner
  }

  // event listeners, with arrow functions
  onmousedown = (event) => {
    document.addEventListener('mousemove', this.onmousemove)
    document.addEventListener('mouseup', this.onmouseup)
  }

  onmousemove = (event) => {
    event.preventDefault()
    if (this.orientation === 'vertical') {
      this.$el.style.top = event.pageY - 25 + 'px'
    } else {
      this.$el.style.left = event.pageX - 25 + 'px'

      const runnerPropArgs = {
        max: this.range,
        pixels:
          this.orientation === 'vertical'
            ? this.$scaleWrapper.offsetHeight
            : this.$scaleWrapper.offsetWidth,
        direction: 'pix2range',
      }

      this.$el.dataset.position = convertRange(runnerPropArgs) * event.pageX
    }
  }

  onmouseup = () => {
    let $runnerParams = {
      Event: this.moveRunnerEvent,
      id: this.id,
      position: this.$el.dataset.position,
    }
    this.moveRunnerEvent.trigger($runnerParams)

    document.removeEventListener('mousemove', this.onmousemove)
    document.removeEventListener('mouseup', this.onmouseup)
  }

  ondragstart = () => {
    return false
  }

  moveRunner(args) {
    const movePropArgs = {
      max: this.range,
      pixels:
        this.orientation === 'vertical'
          ? this.$scaleWrapper.offsetHeight
          : this.$scaleWrapper.offsetWidth,
      direction: 'range2pix',
    }

    if (this.orientation === 'vertical') {
      this.$el.style.top = convertRange(movePropArgs) * args.position + 'px'
    } else {
      this.$el.style.left = convertRange(movePropArgs) * args.position + 'px'
    }
  }
}

export default ViewRunner
