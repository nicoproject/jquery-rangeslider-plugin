import Presenter from './Presenter'
import '../scss/app.scss'
import 'bootstrap'

const mockSliderInitialState: object = {
  id: 1,
  step: 10,
  scale: {
    min: 0,
    max: 400,
    isVisible: true,
  },
  type: 'single',
  orientation: '',
  skin: 'city',
  runners: [
    {
      id: 50123,
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
  ],
}

new Presenter(mockSliderInitialState)
