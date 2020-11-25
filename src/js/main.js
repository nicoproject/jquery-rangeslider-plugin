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
      showTooltip: false,
    },
    {
      id: 2,
      position: 630,
      showTooltip: true,
    },
  ],
}

let mockViewData = {
  runners: mockSliderOptions.runners,
  skin: mockSliderOptions.skin,
}

// let mockSliderOptions1 = {
//   id: 2,
//   step: 20,
//   scale: {
//     min: 0,
//     max: 600,
//   },
//   type: 'single',
//   orientation: 'horizontal',
//   skin: 'sonic',
//   runners: [
//     {
//       id: 1,
//       position: 60,
//       showTooltip: true,
//     },
//     {
//       id: 2,
//       position: 440,
//       showTooltip: true,
//     },
//   ],
// }

// let mockSliderOptions2 = {
//   id: 3,
//   step: 30,
//   scale: {
//     min: 0,
//     max: 500,
//   },
//   type: 'single',
//   orientation: 'horizontal',
//   skin: 'mario',
//   runners: [
//     {
//       id: 1,
//       position: 0,
//       showTooltip: true,
//     },
//     {
//       id: 2,
//       position: 430,
//       showTooltip: true,
//     },
//   ],
// }
// let mockSliderOptions3 = {
//   id: 3,
//   step: 30,
//   scale: {
//     min: 0,
//     max: 500,
//   },
//   type: 'single',
//   orientation: 'horizontal',
//   skin: 'impostor',
//   runners: [
//     {
//       id: 1,
//       position: 0,
//       showTooltip: true,
//     },
//     {
//       id: 2,
//       position: 430,
//       showTooltip: true,
//     },
//   ],
// }

const app1 = new Presenter(mockSliderOptions, mockViewData)
app1.run()

// app1.view.TooltipChangedEvent.addListener((TooltipChangedEvent) => {
//   console.log('TooltipChangedEvent:', TooltipChangedEvent)
// })

// console.log(app1.view)
// const app2 = new Presenter(mockSliderOptions1, mockSliderOptions1.skin)
// app2.run()
// const app3 = new Presenter(mockSliderOptions2, mockSliderOptions2.skin)
// app3.run()
// const app4 = new Presenter(mockSliderOptions3, mockSliderOptions3.skin)
// app4.run()
