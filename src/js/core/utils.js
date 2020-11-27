function convertRange(args) {
  if (args.direction === 'pix2range') {
    return (args.max / args.pixels) * args.clientCoords
  } else {
    return (args.pixels / args.max) * args.clientCoords
  }
}

function startBackgroundLoop($mainWrapper) {
  const x = 0
  setInterval(function () {
    x -= 1
    $mainWrapper.style.backgroundPosition = x + 'px 0'
  }, 10)
}

export { convertRange, startBackgroundLoop }
