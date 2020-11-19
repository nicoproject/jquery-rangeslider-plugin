import Event from './Event'

class View {
  constructor() {
    this.moveRunnerEvent = new Event()
    this.getRunnersEvent = new Event()

    this.runners = this.getRunners()
    this.$mainWrapper = this.createSliderWrapper()

    this.startBackgroundLoop(this.$mainWrapper)
  }

  render() {
    this.createRunners(this.runners)
  }

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

  setRunners(modelRunners) {
    this.runners = modelRunners
    return this.runners
  }

  createRunners(runners = []) {
    console.log('View. CreateRunner runners', runners)
    runners.forEach((runner, i) => {
      this.runners[i] = document.createElement('div')
      this.runners[i].className = `runner runner-id-${runner.id}`
      this.runners[i].dataset.position = runner.position
      this.runners[i].dataset.id = runner.id
      this.runners[i].style.left = runner.position + 'px'
      this.runners[i].addEventListener('click', (event) => {
        this.getRunnersEvent.trigger()
      })

      this.$mainWrapper.appendChild(this.runners[i])
    })
  }

  getRunners() {
    this.getRunnersEvent.trigger()
    return this.runners
  }

  createScale(scale = {}) {
    let scaleWrapper = document.createElement('div')
    scaleWrapper.className = 'scale__wrapper'
    scaleWrapper.dataset.min = scale.min
    scaleWrapper.dataset.max = scale.max

    scaleWrapper.style.width = +scale.max + +scale.min + 'px'

    this.$mainWrapper.appendChild(scaleWrapper)
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
