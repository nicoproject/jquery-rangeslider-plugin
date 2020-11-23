import Event from './Event'

class View {
  constructor(skin, runners) {
    // EVENTS
    this.moveRunnerEvent = new Event()
    this.getRunnersEvent = new Event()
    this.boostRunnersEvent = new Event()
    this.createBarEvent = new Event()

    // OPTIONS
    this.skin = skin
    this.getRunners()
    this.bar = {}

    // DOM ELEMENTS CREATION/BINDINGS
    this.$mainWrapper = this.createSliderWrapper()
    this.$runners = this.createRunners(runners)

    // this.startBackgroundLoop(this.$mainWrapper)
  }

  render(updatedRunners) {
    if (typeof this.$runners !== 'undefined') {
      // console.log('this.$runners recieved: ', this.$runners)

      this.$runners.forEach(($node, i) => {
        // console.log('recieved $node:', $node)
        $node.remove()
        $node = ''
        // console.log('cleared $node:', $node)
      })
      this.$runners.length = 0

      // console.log('this.$runners cleared: ', this.$runners)
    }
    // TODO: REFACTOR CALL CREATERUNNERS
    this.$runners = this.createRunners(updatedRunners)
    this.createRunners(updatedRunners)

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

  // RUNNERS METHODS
  setRunners(modelRunners) {
    this.runners = modelRunners
    return this.runners
  }

  createRunners(
    runners = [
      {
        id: 0,
        position: 0,
        showTooltip: true,
      },
    ]
  ) {
    this.$runners = []
    runners.forEach((runner, i) => {
      // TODO: REFACTOR runner = doc.createEl... + this.runners.push(runner)
      // TOOLTIP
      let showTooltip = runner.showTooltip
      runner[i] = document.createElement('div')
      runner[i].className = `runner runner-id-${runner.id} ${
        showTooltip ? 'runner__tooltip_true' : 'runner__tooltip_false'
      }`
      runner[i].dataset.position = runner.position
      runner[i].dataset.id = runner.id
      runner[i].style.left = runner.position + 'px'
      runner[i].addEventListener('click', (event) => {
        this.boostRunnersEvent.trigger(event.target.dataset.id)
      })
      let isLocked = false
      let id = runner.id
      runner[i].onmousedown = (event) => {
        isLocked = true
        let parentThis = this
        // console.log('parentThis: ', parentThis)
        event.preventDefault() // предотвратить запуск выделения (действие браузера)

        let shiftX = event.clientX - runner[i].getBoundingClientRect().left
        // shiftY здесь не нужен, слайдер двигается только по горизонтали

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        function onMouseMove(event) {
          let runner = parentThis.runners[id - 1]
          let newLeft =
            event.clientX -
            shiftX -
            parentThis.$mainWrapper.scaleWrapper.getBoundingClientRect().left

          if (newLeft < 0) {
            newLeft = 0
          }
          let rightEdge =
            parentThis.$mainWrapper.offsetWidth - runner[id - 1].offsetWidth

          if (newLeft > rightEdge) {
            newLeft = rightEdge
          }
          parentThis.moveRunnerEvent.trigger({
            id: runner.id,
            distance: newLeft,
          })
        }

        function onMouseUp() {
          isLocked = false
          document.removeEventListener('mouseup', onMouseUp)
          document.removeEventListener('mousemove', onMouseMove)
        }
      }

      this.$runners.push(runner[i])

      return this.$runners
    })
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
