import Slider from '../ts/model/Model'
import View from '../ts/view/View'
import ViewPanel from '../ts/view/view_components/ViewPanel'
import { IModelOptions, IPanelOptions } from '../ts/view/ViewInterfaces'

describe('Test: ViewPanel with 1 runner', () => {
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

  view.$controlPanel as ViewPanel

  test('Test: View with 1 runner should be defined', () => {
    expect(view.$controlPanel).toBeDefined()
  })

  test('Test: View with 1 runner should have HTMLElement wrapper', () => {
    expect(view.$controlPanel.$scaleWrapper).toBeInstanceOf(HTMLElement)
  })
})

describe('Test: ViewPanel with 1 runner vertical', () => {
  const mockSliderInitialState: IModelOptions = {
    id: 1,
    step: 10,
    scale: {
      min: 0,
      max: 400,
      isVisible: true,
    },
    orientation: 'vertical',
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

  view.$controlPanel as ViewPanel

  test('Test: View with 1 runner vertical should be defined', () => {
    expect(view.$controlPanel).toBeDefined()
  })

  test('Test: View with 1 runner vertical should have HTMLElement wrapper', () => {
    expect(view.$controlPanel.$scaleWrapper).toBeInstanceOf(HTMLElement)
  })
})

describe('Test: ViewPanel with 2 runners', () => {
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
      {
        id: 3,
        position: 111,
        showTooltip: false,
      },
    ],
  }
  const model = new Slider(mockSliderInitialState)
  const view = new View(model)

  view.$controlPanel as ViewPanel

  test('Test: View with 2 runners should be defined', () => {
    expect(view.$controlPanel).toBeDefined()
  })

  test('Test: View with 2 runners should have HTMLElement wrapper', () => {
    expect(view.$controlPanel.$scaleWrapper).toBeInstanceOf(HTMLElement)
  })
})


describe('Test: ViewPanel with 2 runners vertical', () => {
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
      {
        id: 3,
        position: 111,
        showTooltip: false,
      },
    ],
  }
  const model = new Slider(mockSliderInitialState)
  const view = new View(model)

  view.$controlPanel as ViewPanel

  test('Test: View with 2 runners vertical should be defined', () => {
    expect(view.$controlPanel).toBeDefined()
  })

  test('Test: View with 2 runners vertical should have HTMLElement wrapper', () => {
    expect(view.$controlPanel.$scaleWrapper).toBeInstanceOf(HTMLElement)
  })
})
