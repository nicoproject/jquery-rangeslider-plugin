import Presenter from './Presenter'

const mockSliderOptions = {
  id: 1,
  step: 25,
  scale: {
    min: 0,
    max: 10000,
  },
  type: 'single',
  orientation: 'vertical',
  skin: 'city',
  runners: [
    {
      id: 1,
      position: 1000,
      showTooltip: true,
    },
    {
      id: 2,
      position: 8000,
      showTooltip: true,
    },
    // {
    //   id: 3,
    //   position: 4000,
    //   showTooltip: true,
    // },
    // {
    //   id: 4,
    //   position: 5000,
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

const app1 = new Presenter(mockSliderOptions)
app1.run()
// const app2 = new Presenter(mockSliderOptions1)
// app2.run()
// const app3 = new Presenter(mockSliderOptions)
// app3.run()
// const app4 = new Presenter(mockSliderOptions1)
// app4.run()
