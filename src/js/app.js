import Presenter from './Presenter'
import '../scss/app.scss'

const mockSliderInitialState = {
  id: 1,
  step: 1,
  scale: {
    min: 0,
    max: 20,
    isVisible: true,
  },
  type: 'single',
  orientation: '',
  skin: 'city',
  runners: [
    {
      id: 1,
      position: 5,
      showTooltip: true,
    },
    {
      id: 2,
      position: 14,
      showTooltip: true,
    },
    // {
    //   id: 3,
    //   position: 15,
    //   showTooltip: true,
    // },
    // {
    //   id: 4,
    //   position: 1,
    //   showTooltip: true,
    // },
    // {
    //   id: 5,
    //   position: 7000,
    //   showTooltip: true,
    // },
  ],
}
// const mockSliderOptions1 = {
//   id: 1,
//   step: 25,
//   scale: {
//     min: 0,
//     max: 500,
//   },
//   type: 'single',
//   orientation: '',
//   skin: 'city',
//   runners: [
//     {
//       id: 1,
//       position: 130,
//       showTooltip: true,
//     },
//     {
//       id: 2,
//       position: 330,
//       showTooltip: true,
//     },
//   ],
// }

const app1 = new Presenter(mockSliderInitialState)
app1.run()
// const app2 = new Presenter(mockSliderOptions1)
// app2.run()
// const app3 = new Presenter(mockSliderOptions)
// app3.run()
// const app4 = new Presenter(mockSliderOptions1)
// app4.run()
