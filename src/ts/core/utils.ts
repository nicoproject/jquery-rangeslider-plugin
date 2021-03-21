import {
  IConvertRange,
  IRunnersArray,
  IValidateRunner,
} from '../view/ViewInterfaces'

function convertRange(args: IConvertRange) {
  if (args.direction === 'range2pix') {
    return args.pixels / args.max
  } else {
    return args.max / args.pixels
  }
}

function debounce(fn: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: Array<object>) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function getClosest(arr: Array<number>, goal: number) {
  const output = arr.reduce((prev, curr) =>
    Math.abs(Number(curr) - goal) < Math.abs(Number(prev) - goal) ? curr : prev
  )

  return output
}

function validateInRange(args: IValidateRunner) {
  if (isNaN(args.position)) {
    return args.min
  } else if (args.position >= args.max) {
    return args.max
  } else if (args.position <= args.min) {
    return args.min
  } else {
    return args.position
  }
}

export {
  convertRange,
  getClosest,
  debounce,
  validateInRange,
}
