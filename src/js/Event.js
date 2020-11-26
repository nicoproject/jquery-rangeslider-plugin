class Event {
  constructor() {
    this.listeners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
    // console.log('Event: Listener added:', listener)
  }

  trigger(params) {
    this.listeners.forEach((listener) => {
      listener(params)
      // console.log(`Event. Listener ${listener} triggered with ${params}`)
    })
    
  }

}

export default Event
