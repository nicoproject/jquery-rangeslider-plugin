import { IModelOptions } from './view/ViewInterfaces'

const defaultOptions: IModelOptions = {
  id: 0,
  step: 10,
  scale: {
    min: 0,
    max: 150,
    isVisible: true,
  },
  orientation: 'horizontal',
  skin: 'city',
  runners: [
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
  ],
}

export default defaultOptions
