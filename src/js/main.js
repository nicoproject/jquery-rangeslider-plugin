import Presenter from './Presenter'
let runners = [
  {
    id: 1,
    position: 100,
    showTooltip: true,
  },
  {
    id: 2,
    position: 180,
    showTooltip: true,
  },
]

let mockSliderOptions = {
  id: 1,
  step: 10,
  scale: {
    min: 0,
    max: 700,
  },
  type: 'single',
  orientation: 'horizontal',
  skin: 'city',
  runners: [
    {
      id: 1,
      position: 330,
      showTooltip: true,
    },
    {
      id: 2,
      position: 630,
      showTooltip: true,
    },
  ],
}

let mockSliderOptions1 = {
  id: 2,
  step: 20,
  scale: {
    min: 0,
    max: 600,
  },
  type: 'single',
  orientation: 'horizontal',
  skin: 'sonic',
  runners: [
    {
      id: 1,
      position: 60,
      showTooltip: true,
    },
    {
      id: 2,
      position: 440,
      showTooltip: true,
    },
  ],
}

let mockSliderOptions2 = {
  id: 3,
  step: 30,
  scale: {
    min: 0,
    max: 500,
  },
  type: 'single',
  orientation: 'horizontal',
  skin: 'mario',
  runners: [
    {
      id: 1,
      position: 0,
      showTooltip: true,
    },
    {
      id: 2,
      position: 430,
      showTooltip: true,
    },
  ],
}
let mockSliderOptions3 = {
  id: 3,
  step: 30,
  scale: {
    min: 0,
    max: 500,
  },
  type: 'single',
  orientation: 'horizontal',
  skin: 'impostor',
  runners: [
    {
      id: 1,
      position: 0,
      showTooltip: true,
    },
    {
      id: 2,
      position: 430,
      showTooltip: true,
    },
  ],
}

const app1 = new Presenter(mockSliderOptions, mockSliderOptions.skin)
app1.run()
const app2 = new Presenter(mockSliderOptions1, mockSliderOptions1.skin)
app2.run()
const app3 = new Presenter(mockSliderOptions2, mockSliderOptions2.skin)
app3.run()
const app4 = new Presenter(mockSliderOptions3, mockSliderOptions3.skin)
app4.run()

// const app2 = new Presenter(mockSliderOptions, mockSliderOptions1.skin)
// app2.run()
// const app3 = new Presenter(mockSliderOptions, '')
// app3.run()

// setTimeout(() => {
//   app1.model.moveRunner({id: 1, distance: 90})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 2000)
// setTimeout(() => {
//   app1.model.moveRunner({id: 1, distance: 80})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 3000)
// setTimeout(() => {
//   app1.model.moveRunner({id: 1, distance: 70})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 4000)
// setTimeout(() => {
//   app1.model.moveRunner({id: 1, distance: 60})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 5000)

// setTimeout(() => {
//   app1.model.moveRunner({id: 3, distance: 510})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 6000)

// setTimeout(() => {
//   app1.model.moveRunner({id: 3, distance: 520})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 7000)

// setTimeout(() => {
//   app1.model.moveRunner({id: 3, distance: 530})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 8000)

// setTimeout(() => {
//   app1.model.moveRunner({id: 3, distance: 640})
//   console.log('main.js createBar: ', app1.model.bar)
// }, 9000)

// app1.model.boostRunner(2)
// console.log('main.js app1.model.runners', app1.model.runners)
// app1.model.createBarEvent.trigger({width: 200, startPoint: 0})
