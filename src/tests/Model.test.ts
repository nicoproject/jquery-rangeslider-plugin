import Slider from '../ts/model/Model'
import { IModelOptions } from '../ts/view/ViewInterfaces'

describe('test model', () => {
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

  const model = new Slider(defaultOptions)

  test('test model must be defined', () => {
    expect(model).not.toBeUndefined()
  })
  
})
