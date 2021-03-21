import Slider from '../ts/model/Model'
import View from '../ts/view/View'
import { IEvent, IModelOptions } from '../ts/view/ViewInterfaces'

describe('Test: Event with 1 runner', () => {
  const mockSliderInitialState: IModelOptions = {
    id: 1,
    step: 10,
    scale: {
      min: 0,
      max: 400,
      isVisible: true,
    },
    orientation: '',
    skin: 'city',
    runners: [
      {
        id: 50123,
        position: 201,
        showTooltip: true,
      },
    ],
  }
  const model = new Slider(mockSliderInitialState)
  const view = new View(model)

  const Event = view.clickScaleEvent as IEvent

  test('Test: Event should be defined', () => {
    expect(Event).toBeDefined()
  })
})
