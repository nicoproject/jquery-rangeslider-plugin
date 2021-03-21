import Slider from '../ts/model/Model'
import View from '../ts/view/View'
import ViewRunners from '../ts/view/view_components/ViewRunners'
import { IModelOptions } from '../ts/view/ViewInterfaces'

describe('Test: ViewRunners with 1 runner', () => {
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

  const ViewRunners = view.$runners as ViewRunners

  test('Test: View with 1 runner should be defined', () => {
    expect(ViewRunners).toBeDefined()
  })

  test('Test: View with 1 runner should have HTMLElement wrapper', () => {
    expect(ViewRunners.$el).toBeInstanceOf(HTMLElement)
  })
})

describe('Test: ViewRunners with 1 runner vertical', () => {
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

  const ViewRunners = view.$runners as ViewRunners

  test('Test: View with 1 runner vertical should be defined', () => {
    expect(ViewRunners).toBeDefined()
  })

  test('Test: View with 1 runner vertical should have HTMLElement wrapper', () => {
    expect(ViewRunners.$el).toBeInstanceOf(HTMLElement)
  })
})

describe('Test: ViewRunners with 2 runners', () => {
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
        id: 4,
        position: 211,
        showTooltip: true,
      },
    ],
  }
  const model = new Slider(mockSliderInitialState)
  const view = new View(model)

  const ViewRunners = view.$runners as ViewRunners

  test('Test: View with 2 runners should be defined', () => {
    expect(ViewRunners).toBeDefined()
  })

  test('Test: View with 2 runners should have HTMLElement wrapper', () => {
    expect(ViewRunners.$el).toBeInstanceOf(HTMLElement)
  })
})


describe('Test: ViewRunners with 2 runners vertical', () => {
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
      {
        id: 4,
        position: 211,
        showTooltip: true,
      },
    ],
  }
  const model = new Slider(mockSliderInitialState)
  const view = new View(model)

  const ViewRunners = view.$runners as ViewRunners

  test('Test: View with 2 runners vertical should be defined', () => {
    expect(ViewRunners).toBeDefined()
  })

  test('Test: View with 2 runners vertical should have HTMLElement wrapper', () => {
    expect(ViewRunners.$el).toBeInstanceOf(HTMLElement)
  })
})

