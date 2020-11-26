import Event from './Event'
import ViewScale from './ViewScale'
import ViewTooltip from './ViewTooltip'

class View {
  constructor(modelState = {}) {
    // EVENTS

    // OPTIONS
    this.skin = modelState.skin
    this.scale = modelState.scale
    this.step = modelState.step
    this.runners = modelState.runners
    this.bar = modelState.bar
    this.orientation = modelState.orientation
    console.log('    this.orientation: ', this.orientation)

    // DOM ELEMENTS CREATION/BINDINGS
    this.$mainWrapper = this.createSliderWrapper()
    this.$scale = document.createElement('div')
    this.createScale({
      $el: this.$mainWrapper,
      min: this.scale.min,
      max: this.scale.max,
      step: this.step,
      orientation: this.orientation
    })

    this.$runners = []

    // RENDER ON CREATE
    this.render(this.runners)
  }

  // SLIDER METHODS
  createSliderWrapper(orientation) {
    let verticalClass = ''
    if (this.orientation === 'vertical') {
      verticalClass = 'range-slider_vertical'
    }
    const $mainWrapper = document.createElement('div')
    $mainWrapper.className = `range-slider__main-wrapper ${verticalClass} ${this.skin}`
    document.body.appendChild($mainWrapper)
    return $mainWrapper
  }

  // SCALE METHODS
  /** Creates scale
   * @param options
   * @todo Refactor argument into options obj
   */
  createScale({ $el, min, max, step, orientation }) {
    // USE OF SCALE CLASS
    const scale = new ViewScale($el, min, max, step, orientation)
    console.log('View. createScale scale: ', scale)
    this.$mainWrapper.appendChild(scale.$scaleWrapper)
  }

  // TOOLTIP METHODS
  setTooltips($runners) {
    $runners.forEach(($runner) => {
      const showTooltip = this.runners[$runner.dataset.id - 1].showTooltip
      // USE OF TOOLTIP CLASS
      new ViewTooltip($runner, showTooltip)
    })
  }

  render(updatedRunners) {
    /** Clears Runners nodes to recreate new Runners
     * @todo Move to separate function clearNodes
     */
    if (typeof this.$runners !== 'undefined' && this.$runners.length !== 0) {
      this.$runners.forEach(($node, i) => {
        $node.remove()
        $node = ''
      })
      this.$runners.length = 0
    }
    this.createRunners(updatedRunners)
    this.setTooltips(this.$runners)

    this.$mainWrapper.append(...this.$runners)

    // REMOVE
    const h1 = document.createElement('h1')
    h1.innerHTML = `Шаг равен: ${this.step}`
    document.body.prepend(h1)
  }

  startBackgroundLoop($mainWrapper) {
    const x = 0
    setInterval(function () {
      x -= 1
      $mainWrapper.style.backgroundPosition = x + 'px 0'
    }, 10)
  }

  // BAR METHODS
  createBar(bar) {
    this.createBarEvent.trigger()
    if (this.$mainWrapper.progressBar) {
      this.$mainWrapper.removeChild(this.$mainWrapper.progressBar)
    }

    const progressBar = document.createElement('div')
    progressBar.className = 'bar__wrapper'
    progressBar.dataset.startPoint = bar.startPoint
    progressBar.dataset.width = bar.width

    progressBar.style.width = +bar.width + 'px'
    //TODO REDO FOR CONDITIONAL ORIENTATION
    progressBar.style.left = +bar.startPoint + 'px'

    this.$mainWrapper.progressBar = progressBar
    this.$mainWrapper.appendChild(progressBar)
  }

  // RUNNERS METHODS
  setRunners(modelRunners) {
    this.runners = modelRunners
    return this.runners
  }

  createRunners(runners = [{ id: 0, position: 0, showTooltip: true }]) {
    for (const runner of runners) {
      // TODO: REFACTOR runner = doc.createEl... + this.runners.push(runner)
      const $runner = document.createElement('div')
      $runner.className = `runner runner-id-${runner.id}`
      $runner.dataset.id = runner.id
      $runner.dataset.position = runner.position

      if (this.orientation === 'vertical') {
        $runner.style.top = runner.position + 'px'
      } else {
        $runner.style.left = runner.position + 'px'
      }

      $runner.addEventListener('click', (event) => {
        this.boostRunnersEvent.trigger(event.target.dataset.id)
        this.TooltipChangedEvent.trigger(event.target.dataset.id)
      })

      this.$runners.push($runner)
    }
    return this.$runners
  }
}

export default View
