import Presenter from './Presenter'

const mockSliderOptions = {
  id: 1,
  step: 60,
  scale: {
    min: 0,
    max: 1000,
  },
  type: 'single',
  orientation: 'vertical',
  skin: 'city',
  runners: [
    {
      id: 1,
      position: 130,
      showTooltip: true,
    },
    {
      id: 2,
      position: 330,
      showTooltip: true,
    },
  ],
}

const app1 = new Presenter(mockSliderOptions)
app1.run()
