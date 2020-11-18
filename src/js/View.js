import Event from './Event'

class View {
  constructor() {
    this.moveRunnerEvent = new Event()

    this.runner = document.createElement('div')
    this.runner.className = 'runner'

    this.runner.dataset.distance = 0

    this.runner.addEventListener('click', () => {
      this.moveRunnerEvent.trigger(30)
    })

    // Runner position

    this.runnerPosition
    if (!this.runner.style.left) {
      this.runnerPosition = 0
    } else {
      this.runnerPosition = parseInt(this.runner.style.left, 10)
    }
  }

  render() {
    document.body.prepend(this.runner)
  }

  moveRunner(step) {
    if (this.runnerPosition >= 150) {
      this.finish()
    } else {
      this.runner.style.left = +this.runnerPosition + step + 'px'
    }

    this.runnerPosition = +this.runnerPosition + step

    this.runner.dataset.distance = this.runnerPosition

    console.log(this.runner.dataset.distance)

    return this.runnerPosition
  }

  finish() {
    let $congratsMessage = document.createElement('div')
    $congratsMessage.innerText = 'Поздравляем, Поздравляем'
    $congratsMessage.className = 'congratulations-message'
    document.body.appendChild($congratsMessage)
  }

  autoFinish(step) {
    if (this.runnerPosition <= 150) {
      setTimeout(() => {
        this.moveRunner(step)
        console.log('View: RunnerPosition:', this.runnerPosition)
        console.log('View: step:', step)
        this.autoFinish(step)
      }, 1000)
    }
  }
}

export default View
