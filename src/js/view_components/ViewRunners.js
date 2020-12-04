import { createElement, setAttributes } from '../core/dom'
import { convertRange, debounce } from '../core/utils'
import Event from '../Event'

class ViewRunners {
  constructor(options = {}) {
    /** Register events collection
     * @todo Refactor
     */
    this.moveRunnerEvent = new Event()

    /** Set initial values */
    this.$el = options.$el
    this.runners = options.runners
    this.orientation = options.orientation
    this.range = options.range
    this.$scaleWrapper = options.$scaleWrapper

    //** Set calculated initial values */
    this.$runners = this.createRunners(this.runners)
    this.bindRunnerClickEvent(this.$runners)
    console.log(this)
  }
  /** Creates and returns Runners DOM nodes in array
   * @param {Object} runners
   */
  createRunners(runners = []) {
    this.$runners = []
    for (const runner of runners) {
      /** Creates div, sets data-attributes */
      const $runner = createElement('div', `runner runner-id-${runner.id}`)
      setAttributes($runner, {
        'data-id': runner.id,
        'data-position': runner.position,
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
      const runnerPxPosition = runner.position * convertRange(ccsPropArgs)

      /** Sets runner position
       * @todo Refactor move $runner with appropriate method
       */
      $runner.style.setProperty(cssProp, runnerPxPosition + 'px')

      this.$runners.push($runner)
    }
    return this.$runners
  }

  /** Bind Drag&Drop handler
   * @todo Refactor separate omMouseUp function to this - class scope
   */
  bindRunnerClickEvent($runners = []) {
    $runners.forEach(($runner) => {
      $runner.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', this)
        document.addEventListener('mouseup', this)
      })

      $runner.ondragstart = function() {
        return false;
      };
    })
  }

  onMousemove(event) {
    event.preventDefault()
    this.isPressed = true
    
    if (event.target.classList.contains('runner')) {
      let $el = event.target
      let id = event.target.dataset.id
      
      if (this.isPressed) {
        console.log('$el', $el)
        $el.style.setProperty('left', event.clientX - 35 + 'px')
      }

    }
  }

  onMouseup() {
    if (this.isPressed) {
      document.removeEventListener('mousemove', this)
      document.removeEventListener('mouseup', this)
      console.log('mousemove event removed')
    }
  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    // call method if there
    if (this[method]) {
      this[method](event)
    }
  }
}

export default ViewRunners
