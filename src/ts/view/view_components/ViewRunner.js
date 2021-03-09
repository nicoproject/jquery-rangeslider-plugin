import { createElement, setAttributes } from '../../core/dom'
import { debounce, convertRange } from '../../core/utils'
import Event from '../../Event'

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
    this.isStepped

    /** Set calculated values */
    this.createRunner()

    /**  Add event listener */
    this.$el.addEventListener('mousedown', this.onmousedown)

    /** Register events collection */
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
    } else if (this.min >= 0) {
      const correctPositive = this.min * convertRange(movePropArgs)
      runnerPxPosition = runnerPxPosition - correctPositive
    }

    /** Correct runner px position (based on dimensions)  */
    this.runnerPxDimension =
      this.orientation === 'vertical'
        ? this.$el.offsetHeight
        : this.$el.offsetWidth

    if (this.orientation === 'vertical') {
      this.$el.style.bottom =
        runnerPxPosition - this.runnerPxDimension / 2 + 'px'
    } else {
      this.$el.style.left = runnerPxPosition - this.runnerPxDimension / 2 + 'px'
    }

    /** Set runner position */
    this.$el.dataset.position = runnerPosition
  }

  /** event listeners, with arrow functions */
  onmousedown = (event) => {
    document.addEventListener('mousemove', this.onmousemove)
    document.addEventListener('mouseup', this.onmouseup)
  }

  /** Drag and Drop */
  onmousemove = (event) => {
    /** Remove browser selection action */
    event.preventDefault()

    /** Remove browser drag&drop */
    ondragstart = () => false

    /** Get largest wrapper dimension in px depending on orientation */
    const wrapperLength =
      this.orientation === 'vertical'
        ? this.$scaleWrapper.offsetHeight
        : this.$scaleWrapper.offsetWidth

    /** Set initial properties for runner pix to range converter  */
    const runnerPropArgs = {
      max: this.range,
      pixels: wrapperLength,
      direction: 'pix2range',
    }

    /** Set initial properties for step to px converter  */
    const stepPropArgs = {
      max: this.range,
      pixels: wrapperLength,
      direction: 'range2pix',
    }

    /************************
     * Define variables set
     ************************/
    /** Get cursor chosen axis coordinates */
    let clientAxisValue
    /** Runner HTMLElement length */
    let $elLength
    /** Get shift axis value */
    let shiftAxis
    /** Get element style property name  */
    let $elMarginProp
    /** Get Runner HTMLElement coordinates */
    let $elCoords = {
      left: this.$el.getBoundingClientRect().left,
      right: this.$el.getBoundingClientRect().right,
      top: this.$el.getBoundingClientRect().top,
      bottom: this.$el.getBoundingClientRect().bottom,
    }
    let newRunnerPosition

    /** Define variables depending on orientation */
    if (this.orientation === 'vertical') {
      clientAxisValue = runnerPropArgs.pixels - event.clientY
      $elLength = this.$el.offsetHeight
      /** Strange shiftAxis logic for vertical */
      shiftAxis = this.$scaleWrapper.getBoundingClientRect().top
      $elMarginProp = 'bottom'
      newRunnerPosition = clientAxisValue + shiftAxis

      /** Check if newRunnerPosition extends min/max limits */
      if (newRunnerPosition > wrapperLength) {
        newRunnerPosition = wrapperLength
      } else if (newRunnerPosition < 0) {
        newRunnerPosition = 0
      }
    } else {
      clientAxisValue = event.clientX
      $elLength = this.$el.offsetWidth
      shiftAxis =
        this.$scaleWrapper.getBoundingClientRect().left + $elLength / 2
      $elMarginProp = 'left'
      newRunnerPosition = clientAxisValue - shiftAxis

      /** Check if newRunnerPosition extends min/max limits */
      if (newRunnerPosition > wrapperLength - $elLength / 2) {
        newRunnerPosition = wrapperLength - $elLength / 2
      } else if (newRunnerPosition < 0 - $elLength / 2) {
        newRunnerPosition = 0 - $elLength / 2
      }
    }

    /** Get step dimension in px */
    const stepPx = this.step * convertRange(stepPropArgs)

    /** Define if runner movement is stepped */
    if (this.$scaleWrapper.offsetWidth / stepPx <= 20) {
      this.isStepped = true
    } else {
      this.isStepped = false
    }

    if (this.isStepped) {
      let $elStartCoord
      let $elEndCoord
      if (this.orientation === 'vertical') {
        $elStartCoord = $elCoords.top
        $elEndCoord = $elCoords.bottom
      } else {
        $elStartCoord = $elCoords.left
        $elEndCoord = $elCoords.right
      }

      if (
        newRunnerPosition - $elStartCoord > stepPx / 2 ||
        $elEndCoord - newRunnerPosition > stepPx / 2
      ) {
        let stepsCount = Math.ceil(newRunnerPosition / stepPx)

        this.$el.style[$elMarginProp] =
          stepsCount * stepPx - $elLength / 2 + 'px'

        /** Calculate and set data-position of runner depending on negative values */
        if (this.hasNegative) {
          this.$el.dataset.position =
            stepsCount * this.step - Math.abs(this.min)
        } else {
          this.$el.dataset.position = this.min + stepsCount * this.step
        }
      }
    } else {
      /** If !isStepped use convertRange for detailed position */
      this.$el.style[$elMarginProp] = newRunnerPosition + 'px'
      if (this.hasNegative) {
        this.$el.dataset.position =
          (
            (newRunnerPosition + $elLength / 2) *
            convertRange(runnerPropArgs)
          ).toFixed() - Math.abs(this.min)
      } else {
        this.$el.dataset.position = (
          (newRunnerPosition + $elLength / 2) *
          convertRange(runnerPropArgs)
        ).toFixed()
      }
    }
  }

  onmouseup = () => {
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
