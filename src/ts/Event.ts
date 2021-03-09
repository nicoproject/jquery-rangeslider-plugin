class Event {
  private listeners: Array<(params: object) => void>
  // listeners: any[]
  constructor() {
    this.listeners = []
  }

  addListener(listener: () => void) {
    this.listeners.push(listener)
  }

  trigger(params: object = {}) {
    console.log(typeof params, params, 'params')

    this.listeners.forEach((listener) => {
      listener(params)
    })
  }
}

export default Event
