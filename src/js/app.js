import Presenter from './Presenter'
import '../scss/app.scss'

const mockSliderInitialState = {
  id: 1,
  step: 10,
  scale: {
    min: 200,
    max: 400,
    isVisible: true,
  },
  type: 'single',
  orientation: '',
  skin: 'city',
  runners: [
    {
      id: 1,
      position: 201,
      showTooltip: true,
    },
    {
      id: 2,
      position: 210,
      showTooltip: true,
    },
    {
      id: 3,
      position: 220,
      showTooltip: true,
    },
    // {
    //   id: 4,
    //   position: 8,
    //   showTooltip: true,
    // },
    // {
    //   id: 5,
    //   position: 10,
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

// setTimeout(() => {
//   console.log('app1.view.$runners.$runners[0]', app1.view.$runners.$runners[0])
//   app1.view.$runners.$runners[0].moveRunner(5)
// }, 2000)

// setTimeout(() => {
//   console.log('app1.view.$runners.$runners[0]', app1.view.$runners.$runners[0])
//   app1.view.$runners.$runners[0].moveRunner(8)
// }, 4000)

// setTimeout(()=> {
//   console.log(app1.model.scale.min)
//   app1.model.scale.min = -40
//   console.log(app1.model.scale.min)
//   app1.view.scale.min = -40
//   app1.view.step = 1
//   app1.view.createScale()
//   console.log(app1.view._scale)
// }, 2000)
