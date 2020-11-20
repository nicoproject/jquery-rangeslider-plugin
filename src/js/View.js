import Event from './Event'

class View {
  constructor() {
    this.moveRunnerEvent = new Event()
    this.getRunnersEvent = new Event()
    this.boostRunnersEvent = new Event()

    this.getRunners()
    this.$mainWrapper = this.createSliderWrapper()

    // this.startBackgroundLoop(this.$mainWrapper)
  }

  // TODO: REFACTOR W ARRAY OR OBJECT METHOD INSTEAD OF WHILE
  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      console.dir(parent.firstChild)
      parent.removeChild(parent.firstChild)
    }
  }

  render(updatedRunners) {
    Array.from(document.body.querySelectorAll('.runner')).forEach((element) => {
      element.remove()
    })
    // this.removeAllChildNodes(this.$mainWrapper)
    // console.log('View. render cleared this.runners: ', this.runners);
    // this.getRunners()
    // console.log('View. render get this.runners: ', this.runners);
    this.createRunners(updatedRunners)
  }

  // SLIDER METHODS
  createSliderWrapper() {
    let $mainWrapper = document.createElement('div')
    $mainWrapper.className = 'range-slider__main-wrapper'

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

    this.$mainWrapper.appendChild(scaleWrapper)
  }

  // BAR METHODS
  createBar(bar) {
    let progressBar = document.createElement('div')
    progressBar.className = 'bar__wrapper'
    progressBar.dataset.startPoint = bar.startPoint
    progressBar.dataset.width = bar.width

    progressBar.style.width = +bar.width + 'px'
    //TODO REDO FOR CONDITIONAL ORIENTATION
    progressBar.style.left = +bar.startPoint + 'px'

    this.$mainWrapper.appendChild(progressBar)
  }

  // RUNNERS METHODS
  setRunners(modelRunners) {
    this.runners = modelRunners
    return this.runners
  }

  createRunners(runners = [{ id: 0, position: 0, showTooltip: true }]) {
    // console.log('View. CreateRunner runners', runners)
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

      this.$mainWrapper.appendChild(runner[i])
    })
    // console.log(this)
  }

  getRunners() {
    this.getRunnersEvent.trigger()
    return this
  }

  boostRunners() {
    console.log('View. boostRunners this.runners: ', this.runners)
    // this.render(this.runners)
  }

  // Runner position
  // this.runnerPosition
  // if (!this.runner.style.left) {
  //   this.runnerPosition = 0
  // } else {
  //   this.runnerPosition = parseInt(this.runner.style.left, 10)
  // }

  // console.log('View. this.runners in constructor: ', this.runners)

  moveRunner(params) {
    console.log('View. moveRunner method initiated w params: ', params)
    // if (this.runnerPosition >= 150) {
    //   this.showFinish()
    // } else {
    //   this.runner.style.left = +this.runnerPosition + step + 'px'
    // }

    // this.runnerPosition = +this.runnerPosition + step
    // this.runner.dataset.distance = this.runnerPosition
    // console.log(this.runner.dataset.distance)
    // return this.runnerPosition
  }

  // showFinish() {
  //   let $congratsMessage = document.createElement('div')
  //   $congratsMessage.innerText = 'Поздравляем, Поздравляем'
  //   $congratsMessage.className = 'congratulations-message'
  //   document.body.appendChild($congratsMessage)
  // }

  // autoFinish(step) {
  //   if (this.runnerPosition <= 150) {
  //     setTimeout(() => {
  //       this.moveRunner(step)
  //       console.log('View: RunnerPosition:', this.runnerPosition)
  //       console.log('View: step:', step)
  //       this.autoFinish(step)
  //     }, 1000)
  //   }
  // }
}

export default View
