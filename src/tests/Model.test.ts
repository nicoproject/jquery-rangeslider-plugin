import Slider from '../ts/model/Model'
import { IModelOptions, IRunnersArray } from '../ts/view/ViewInterfaces'

describe('Test: Model with undefined options', () => {
  const defaultOptions: IModelOptions = undefined

  const model = new Slider(defaultOptions)

  test('Test: Model should load default options', () => {
    expect(model).not.toBeUndefined()
  })

  test('Test: Model id should be equal to 0 ', () => {
    expect(model.id).toEqual(0)
  })
})

describe('Test: Model must be defined', () => {
  const defaultOptions: IModelOptions = {
    id: 0,
    step: 10,
    scale: {
      min: -100,
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
    ],
  }

  const model = new Slider(defaultOptions)

  test('Test: Model must be defined', () => {
    expect(model).not.toBeUndefined()
  })
})

describe('Test: Model methods', () => {
  const defaultOptions: IModelOptions = {
    id: 0,
    step: 10,
    scale: {
      min: -100,
      max: 150,
      isVisible: true,
    },
    orientation: 'horizontal',
    skin: 'city',
    runners: [
      {
        id: 1,
        position: 1000,
        showTooltip: true,
      },
      {
        id: 2,
        position: 100,
        showTooltip: true,
      },
    ],
  }

  const model = new Slider(defaultOptions)

  test('Test: setupRunners() should return array', () => {
    expect(model.setupRunners(model.options.runners)).toBeArrayOfSize(2)
  })

  test('Test: validateRunnerPosition() should put invalid runners on min', () => {
    model.validateRunnerPosition({
      position: model.options.runners[0].position,
    })
    expect(model.options.runners[0].position).toEqual(model.options.scale.min)
  })

  test('Test: validateRunnerPosition() should not change valid runners positions', () => {
    model.validateRunnerPosition({
      position: model.options.runners[1].position,
    })
    expect(model.options.runners[1].position).toEqual(100)
  })

  test('Test: sortRunnersByPosition() should rearrange array of runners', () => {
    let runnersArray: Array<IRunnersArray> = [
      {
        id: 180,
        position: 100,
        showTooltip: true,
      },
      {
        id: 5,
        position: -10,
        showTooltip: true,
      },
    ]
    runnersArray = model.sortRunnersByPosition(runnersArray)
    expect(runnersArray[0].id).toEqual(5)
  })

  test('Test: createBar() should return IBar object', () => {
    const bar = model.createBar()
    expect(bar).toContainKeys(['length', 'startPoint', 'orientation'])
  })

  test('Test: scaleHasNegative() should return boolean', () => {
    expect(typeof model.hasNegative === 'boolean').toBeTrue
  })

  test('Test: calculateRange() should return number', () => {
    expect(typeof model.range === 'number').toBeTrue
  })
})
