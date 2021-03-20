import {
  IConvertRange,
  IRunnersArray,
  IValidateRunner,
} from '../ts/view/ViewInterfaces'

import {
  convertRange,
  getClosest,
  debounce,
  validateInRange,
} from '../ts/core/utils'

describe('Test: Utilities helper functions', () => {
  const properties: IConvertRange = {
    max: 100,
    pixels: 800,
    direction: 'range2pix',
  }

  const debounced = debounce(jest.fn, 10)

  const runnersArray = [100, 180, -6000]
  const closestRunner = getClosest(runnersArray, 600)

  const runnerToValidate: IValidateRunner = {
    min: -12000,
    max: 900,
    position: 1000
  }
 const validatedRunner = validateInRange(runnerToValidate)


  test('Test: convertRange() should return number', () => {
    const convertedRange = convertRange(properties)
    expect(typeof convertedRange).toEqual('number')
  })

  test('Test: debounce() should return function', () => {
    expect(typeof debounced).toBe('function')
  })

  test('Test: closestRunner() should return matched value from array', () => {
    expect(closestRunner).toEqual(180)
  })

  test('Test: closestRunner() should return number', () => {
    expect(typeof closestRunner).toBe('number')
  })

  test('Test: validateInRange() should validate given object', () => {
    expect(validatedRunner).toEqual(900)
  })

})
