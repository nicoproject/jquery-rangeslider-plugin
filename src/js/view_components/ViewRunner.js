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
    this.step = args.step

    /** Set calculated values */
    this.createRunner()

    // add event listener
    this.$el.addEventListener('mousedown', this.onmousedown)

    /** Register events collection
     * @todo Refactor
     */
    this.moveRunnerEvent = new Event()

    /** Debounce heavy function, to execute once in 7 ms */
    this.onmousemove = debounce(this.onmousemove, 7)
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
    }

    /** Correct runner px position (based on dimensions)  */
    this.runnerPxDimension =
      this.orientation === 'vertical'
        ? this.$el.offsetHeight
        : this.$el.offsetWidth

    if (this.orientation === 'vertical') {
      this.$el.style.bottom = runnerPxPosition + 'px'
    } else {
      this.$el.style.left = runnerPxPosition - this.$el.offsetWidth / 2 + 'px'
    }

    /** Set runner position */
    this.$el.dataset.position = runnerPosition
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
    /** Remove browser selection action */
    event.preventDefault()

    /** Remove browser drag&drop */
    ondragstart = () => false

    /** Get largest wrapper dimension in px depending on orientation
     * @todo rename variable
     */
    const pixels =
      this.orientation === 'vertical'
        ? this.$scaleWrapper.offsetHeight
        : this.$scaleWrapper.offsetWidth

    /** Set initial properties for runner pix to range converter  */
    const runnerPropArgs = {
      max: this.range,
      pixels: pixels,
      direction: 'pix2range',
    }

    /** Set initial properties for step to px converter  */
    const stepPropArgs = {
      max: this.range,
      pixels: pixels,
      direction: 'range2pix',
    }

    /** Get cursor coordinates */
    let clientAxisValue =
      this.orientation === 'vertical'
        ? Math.abs(event.pageY - runnerPropArgs.pixels)
        : event.clientX

    //** Get element length depending on orientation */
    const $elLength =
      this.orientation === 'vertical'
        ? this.$el.offsetHeight
        : this.$el.offsetWidth

    /**
     * @todo Check for bugs in vertical orientation
     */
    let shiftAxis =
      this.orientation === 'vertical'
        ? this.$scaleWrapper.getBoundingClientRect().top +
          this.$el.offsetHeight / 2
        : this.$scaleWrapper.getBoundingClientRect().left +
          this.$el.offsetWidth / 2

    //** Get element style property name depending on orientation */
    let $elMarginProp = this.orientation === 'vertical' ? 'bottom' : 'left'

    let newRunnerPosition = clientAxisValue - shiftAxis

    /**
     * Check if newRunnerPosition extends max limits
     * If cursor position > then max scale value
     */
    if (newRunnerPosition > pixels - $elLength) {
      newRunnerPosition = pixels - $elLength / 2
    } else if (newRunnerPosition < 0 - $elLength / 2) {
      newRunnerPosition = 0 - $elLength / 2
    }

    /** Get step dimension in px */
    const stepPx = this.step * convertRange(stepPropArgs)

    /** Move Runner to the maximum
     * @todo rewrite w use of utility fn replacing getBoundingClientRect as getCoords
     */
    if (
      newRunnerPosition >
      this.$el.getBoundingClientRect().right + stepPx / 2
    ) {
      /** If isStepped multiply step pixels value on steps quantity */
      if (this.$scaleWrapper.offsetWidth / stepPx <= 20) {
        this.$el.style[$elMarginProp] =
          Math.ceil(newRunnerPosition / stepPx) * stepPx - $elLength / 2 + 'px'
        this.$el.dataset.position =
          Math.ceil(newRunnerPosition / stepPx) * this.step
      } else {
        /** If !isStepped use convertRange for detailed position */
        this.$el.style[$elMarginProp] = newRunnerPosition + 'px'
        this.$el.dataset.position = (
          (newRunnerPosition + $elLength / 2) *
          convertRange(runnerPropArgs)
        ).toFixed(2)
      }
    }

    /** Move Runner to the minimum
     * @todo Rewrite this condition - doesn't work on wrong stepped
     *
     */
    if (
      newRunnerPosition <
      this.$el.getBoundingClientRect().left - stepPx / 2
    ) {
      /** @todo change this condition for isStepped flag */
      if (this.$scaleWrapper.offsetWidth / stepPx <= 20) {
        if (newRunnerPosition <= 0 - this.$el.offsetWidth / 2) {
          this.$el.style[$elMarginProp] = 0 - $elLength / 2
        }
        this.$el.style[$elMarginProp] =
          Math.floor(newRunnerPosition / stepPx) * stepPx + $elLength / 2 + 'px'
        /** @todo Fix wrong position calculation */
        this.$el.dataset.position =
          Math.ceil(newRunnerPosition / stepPx) * this.step
      } else {
        /** @todo !isStepped */
        this.$el.style[$elMarginProp] = newRunnerPosition + 'px'
        this.$el.dataset.position = (
          (newRunnerPosition + $elLength / 2) *
          convertRange(runnerPropArgs)
        ).toFixed(2)
      }
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
}

export default ViewRunner
