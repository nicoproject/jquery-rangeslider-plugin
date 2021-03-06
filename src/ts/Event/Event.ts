class Event {
  listeners: Array<(params: object) => void>
  constructor() {
    this.listeners = []
  }

  addListener(listener: () => void) {
    this.listeners.push(listener)
  }

  trigger(params: object = {}) {

    this.listeners.forEach((listener) => {
      listener(params)
    })
  }
}

export default Event
