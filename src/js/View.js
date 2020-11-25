import Event from './Event'
import EventObserver from './EventObserver'
import ViewTooltip from './ViewTooltip'

class View {
  constructor(viewData) {
    // EVENTS
    this.TooltipChangedEvent = new Event()

    this.moveRunnerEvent = new Event()
    this.getRunnersEvent = new Event()
    this.boostRunnersEvent = new Event()
    this.createBarEvent = new Event()

    // OPTIONS
    this.runners = viewData.runners
    this.skin = viewData.skin
    this.bar = {}

    // DOM ELEMENTS CREATION/BINDINGS
    this.$mainWrapper = this.createSliderWrapper()
    this.$runners = []

    // this.startBackgroundLoop(this.$mainWrapper)

    // RENDER ON CREATE
    this.render(this.runners)
    console.log('View. this: ', this)
  }

  render(updatedRunners) {
    // !TODO: Move to separate function clearNodes
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
  }

  // SLIDER METHODS

  createSliderWrapper() {
    let $mainWrapper = document.createElement('div')
    $mainWrapper.className = `range-slider__main-wrapper ${this.skin}`

    document.body.appendChild($mainWrapper)
    return $mainWrapper
  }

  startBackgroundLoop($mainWrapper) {
    let x = 0
    setInterval(function () {
      x -= 1
      $mainWrapper.style.backgroundPosition = x + 'px 0'
    }, 10)
  }

  // SCALE METHODS
  createScale(scale = {}) {
    let scaleWrapper = document.createElement('div')
    scaleWrapper.className = 'scale__wrapper'
    scaleWrapper.dataset.min = scale.min
    scaleWrapper.dataset.max = scale.max

    scaleWrapper.style.width = +scale.max + +scale.min + 'px'

    this.$mainWrapper.scaleWrapper = scaleWrapper
    this.$mainWrapper.appendChild(scaleWrapper)
  }

  // BAR METHODS
  createBar(bar) {
    this.createBarEvent.trigger()
    if (this.$mainWrapper.progressBar) {
      this.$mainWrapper.removeChild(this.$mainWrapper.progressBar)
    }

    let progressBar = document.createElement('div')
    progressBar.className = 'bar__wrapper'
    progressBar.dataset.startPoint = bar.startPoint
    progressBar.dataset.width = bar.width

    progressBar.style.width = +bar.width + 'px'
    //TODO REDO FOR CONDITIONAL ORIENTATION
    progressBar.style.left = +bar.startPoint + 'px'

    this.$mainWrapper.progressBar = progressBar
    this.$mainWrapper.appendChild(progressBar)
  }

  // TOOLTIP METHODS
  setTooltips($runners) {
    $runners.forEach(($runner) => {
      let showTooltip = this.runners[$runner.dataset.id - 1].showTooltip
      // USE OF TOOLTIP CLASS
      new ViewTooltip($runner, showTooltip)
    })
  }

  getTooltipEvents() {}

  // RUNNERS METHODS
  setRunners(modelRunners) {
    this.runners = modelRunners
    return this.runners
  }

  createRunners(runners = [{ id: 0, position: 0, showTooltip: true }]) {
    for (let runner of runners) {
      // TODO: REFACTOR runner = doc.createEl... + this.runners.push(runner)
      let $runner = document.createElement('div')
      $runner.className = `runner runner-id-${runner.id}`
      $runner.dataset.id = runner.id
      $runner.dataset.position = runner.position
      $runner.style.left = runner.position + 'px'
      $runner.addEventListener('click', (event) => {
        this.boostRunnersEvent.trigger(event.target.dataset.id)
        this.TooltipChangedEvent.trigger(event.target.dataset.id)
      })

      this.$runners.push($runner)
    }
    return this.$runners
  }

  getRunners() {
    this.getRunnersEvent.trigger()
    return this.$runners
  }

  moveRunner(params) {
    let id = params.id
    let distance = params.distance
    this.$runners.forEach((runner) => {
      if (runner.id === id) {
        runner.dataset.position = distance
        runner.style.left = distance + 'px'
      }
      return runner
    })
    this.moveRunnerEvent.trigger(params)
  }
}

export default View

// DRAG&DROP
// let isLocked = false
// let id = runner.id      // runner[i].onmousedown = (event) => {
//   isLocked = true
//   let parentThis = this
//   // console.log('parentThis: ', parentThis)
//   event.preventDefault() // предотвратить запуск выделения (действие браузера)

//   let shiftX = event.clientX - runner[i].getBoundingClientRect().left
//   // shiftY здесь не нужен, слайдер двигается только по горизонтали

//   document.addEventListener('mousemove', onMouseMove)
//   document.addEventListener('mouseup', onMouseUp)

//   function onMouseMove(event) {
//     let runner = parentThis.runners[id - 1]
//     let newLeft =
//       event.clientX -
//       shiftX -
//       parentThis.$mainWrapper.scaleWrapper.getBoundingClientRect().left

//     if (newLeft < 0) {
//       newLeft = 0
//     }
//     let rightEdge =
//       parentThis.$mainWrapper.offsetWidth - runner[id - 1].offsetWidth

//     if (newLeft > rightEdge) {
//       newLeft = rightEdge
//     }
//     parentThis.moveRunnerEvent.trigger({
//       id: runner.id,
//       distance: newLeft,
//     })
//   }

//   function onMouseUp() {
//     isLocked = false
//     document.removeEventListener('mouseup', onMouseUp)
//     document.removeEventListener('mousemove', onMouseMove)
//   }
// }
