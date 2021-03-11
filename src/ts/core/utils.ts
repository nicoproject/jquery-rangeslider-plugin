import { IValidateRunner } from '../view/ViewInterfaces'

function convertRange(args: any) {
  if (args.direction === 'range2pix') {
    return args.pixels / args.max
  } else {
    return args.max / args.pixels
  }
}

function debounce(fn: any, wait: number) {
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
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  )

  return output
}

function startBackgroundLoop($mainWrapper: HTMLElement) {
  let x = 0
  setInterval(function () {
    x -= 1
    $mainWrapper.style.backgroundPosition = x + 'px 0'
  }, 10)
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
  startBackgroundLoop,
  getClosest,
  debounce,
  validateInRange,
}
