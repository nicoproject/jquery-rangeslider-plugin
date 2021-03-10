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

interface IBarOptions {
  $el: HTMLElement
  $scaleWrapper: HTMLElement
  barLength: number
  barStartPoint: number
  orientation: string
  range: number
  hasNegative: boolean
  min: number
}

interface IPanelOptions {
  $el: HTMLElement
  skin: string
  orientation: string
  step: number
  min: number
  max: number
  scaleVisible: boolean
  runners: object
}

interface IEvent {
  listeners: Array<(params: object) => void>
  trigger(params: object): void
  addListener(listener: () => void): void
}

interface IRunnerOptions {
  orientation: string
  id: number
  position: number
  tooltip: boolean
  range: number
  $scaleWrapper: HTMLDivElement
  hasNegative: boolean
  min: number
  step: number
}

export { IScaleOptions, IBarOptions, IPanelOptions, IEvent, IRunnerOptions }
