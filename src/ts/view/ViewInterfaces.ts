interface IViewScale {
  clickScaleEvent: object
  $el: HTMLElement
  min: number
  max: number
  isVisible: boolean
  step: number
  orientation: string
  range: number
  hasNegative: boolean
  $canvas: HTMLCanvasElement
}

interface IScaleOptions {
  $el: HTMLElement
  min: number
  max: number
  step: number
  orientation: string
  range: number
  hasNegative: boolean
  scaleVisible: boolean
  runnerPxSize: {
    height: number
    width: number
  }
}

export { IViewScale, IScaleOptions }
