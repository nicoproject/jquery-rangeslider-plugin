class Event {
  constructor() {
    this.listeners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
    console.log('Event: Listener added:', listener)
  }

  trigger(params) {
    this.listeners.forEach((listener) => {
      listener(params)
      console.log(`listener ${listener} triggered w ${params}`)
    })
    
  }

}

export default Event
