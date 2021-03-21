import Slider from '../ts/model/Model'
import View from '../ts/view/View'
import ViewRunner from '../ts/view/view_components/ViewRunner'
import { IModelOptions } from '../ts/view/ViewInterfaces'

describe('Test: ViewRunner with 1 runner', () => {
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

  const runner = view.$runners.$runners[0] as ViewRunner

  test('Test: View with 1 runner should be defined', () => {
    expect(runner).toBeDefined()
  })

  test('Test: View with 1 runner should have HTMLElement wrapper', () => {
    expect(runner.$el).toBeInstanceOf(HTMLElement)
  })
})

describe('Test: ViewRunner with 1 runner vertical', () => {
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

  const runner = view.$runners.$runners[0] as ViewRunner

  test('Test: View with 1 runner vertical should be defined', () => {
    expect(runner).toBeDefined()
  })

  test('Test: View with 1 runner vertical should have HTMLElement wrapper', () => {
    expect(runner.$el).toBeInstanceOf(HTMLElement)
  })
})

describe('Test: ViewRunner with 2 runners', () => {
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
        position: 1,
        showTooltip: true,
      },
    ],
  }
  const model = new Slider(mockSliderInitialState)
  const view = new View(model)

  const runner1 = view.$runners.$runners[0] as ViewRunner
  const runner2 = view.$runners.$runners[1] as ViewRunner

  test('Test: View with 2 runners should be defined', () => {
    expect(runner1).toBeDefined()
    expect(runner2).toBeDefined()
  })

  test('Test: View with 2 runners should have HTMLElement wrapper', () => {
    expect(runner1.$el).toBeInstanceOf(HTMLElement)
    expect(runner2.$el).toBeInstanceOf(HTMLElement)
  })
})


describe('Test: ViewRunner with 2 runners vertical', () => {
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
        id: 3,
        position: 1,
        showTooltip: true,
      },
    ],
  }
  const model = new Slider(mockSliderInitialState)
  const view = new View(model)

  const runner1 = view.$runners.$runners[0] as ViewRunner
  const runner2 = view.$runners.$runners[1] as ViewRunner

  test('Test: View with 2 runners vertical should be defined', () => {
    expect(runner1).toBeDefined()
    expect(runner2).toBeDefined()
  })

  test('Test: View with 2 runners vertical should have HTMLElement wrapper', () => {
    expect(runner1.$el).toBeInstanceOf(HTMLElement)
    expect(runner2.$el).toBeInstanceOf(HTMLElement)
  })
})
