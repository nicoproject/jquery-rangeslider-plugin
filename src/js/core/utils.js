function convertRange(args) {
  if (args.direction === 'range2pix') {
    return args.pixels / args.max
  } else {
    return args.max / args.pixels
  }
}

function startBackgroundLoop($mainWrapper) {
  const x = 0
  setInterval(function () {
    x -= 1
    $mainWrapper.style.backgroundPosition = x + 'px 0'
  }, 10)
}

function debounce(fn, wait) {
  let timeout
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function getClosest(arr = [], goal) {
  const output = arr.reduce((prev, curr) =>
  Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  )

  return output
}

export { convertRange, startBackgroundLoop, getClosest, debounce }
