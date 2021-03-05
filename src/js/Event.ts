class Event {
  listeners: any[]
  constructor() {
    this.listeners = []
  }

  addListener(listener: object) {
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
