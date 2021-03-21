import Presenter from './../ts/presenter/Presenter'
import { IModelOptions } from './../ts/view/ViewInterfaces'

describe('Test: Presenter with 1 runner', () => {
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

  const slider = new Presenter(mockSliderInitialState)

  test('Test: Presenter with 1 runner should be defined', () => {
    expect(Presenter).toBeDefined()
    expect(slider.model.id).toEqual(1)
    expect(slider.model.range).toEqual(400)
  })
})

describe('Test: Presenter with 1 runner Vertical', () => {
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

  const slider = new Presenter(mockSliderInitialState)

  test('Test: Presenter with 1 runner should be defined', () => {
    expect(Presenter).toBeDefined()
    expect(slider.model.orientation).toEqual('vertical')
    expect(slider.model.range).toEqual(400)
  })
})

describe('Test: Presenter with 2 runners', () => {
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
        id: 2,
        position: -210,
        showTooltip: true,
      },
    ],
  }

  const slider = new Presenter(mockSliderInitialState)

  test('Test: Presenter with 2 runners  should be defined', () => {
    expect(Presenter).toBeDefined()
    expect(slider.model.id).toEqual(1)
    expect(slider.model.range).toEqual(400)
  })
})

describe('Test: Presenter with 2 runners Vertical', () => {
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
        id: 2,
        position: -210,
        showTooltip: true,
      },
    ],
  }

  const slider = new Presenter(mockSliderInitialState)

  test('Test: Presenter with 2 runners  should be defined', () => {
    expect(Presenter).toBeDefined()
    expect(slider.model.orientation).toEqual('vertical')
    expect(slider.model.range).toEqual(400)
  })
})

describe('Test: Presenter with 2+ runners', () => {
  const mockSliderInitialState: IModelOptions = {
    id: 1,
    step: 10,
    scale: {
      min: -200,
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
        id: 2,
        position: -210,
        showTooltip: true,
      },
      {
        id: 3,
        position: 220,
        showTooltip: true,
      },
    ],
  }

  const slider = new Presenter(mockSliderInitialState)

  test('Test: Presenter with 2+ runners should be defined', () => {
    expect(Presenter).toBeDefined()
    expect(slider.model.id).toEqual(1)
    expect(slider.model.range).toEqual(600)
  })
})
