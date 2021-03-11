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
  id: number
  $scaleWrapper: HTMLDivElement
  orientation: string
  position: number
  tooltip: boolean
  range: number
  hasNegative: boolean
  min: number
  step: number
  showTooltip?: boolean
  moveRunner?: (arg: number) => void
}

interface IRunnersOptions {
  $el: HTMLDivElement
  $scaleWrapper?: HTMLDivElement
  runners: Array<object>
  orientation: string
  range: number
  hasNegative: boolean
  min: number
  step: number
}

interface IDrawRulerArgs {
  $el: HTMLDivElement
  orientation: string
}

interface IModelStateOptions {
  options: {
    scale: { isVisible: boolean }
    skin: string
    step: number
    runners: Array<object>
    orientation: string
    isVisible: boolean
  }
  bar: object
  range: number
  hasNegative: boolean
}

interface IModelOptions {
  id: number
  step: number
  scale: {
    min: number
    max: number
    isVisible: boolean
  }
  orientation: string
  skin: string
  runners: Array<{
    id: number
    position: number
    showTooltip: boolean
  }>
}

interface IConvertRange {
  max: number
  pixels: number
  direction: string
}

interface IValidateRunner {
  min: number
  max: number
  position: number
}

interface IRunnersArray {
    id: number
    position: number
    showTooltip: boolean
}

interface IListenerObject {
  [key: string]: Record<string, number> 
}

export {
  IScaleOptions,
  IRunnersOptions,
  IBarOptions,
  IPanelOptions,
  IEvent,
  IRunnerOptions,
  IDrawRulerArgs,
  IModelStateOptions,
  IConvertRange,
  IValidateRunner,
  IModelOptions,
  IRunnersArray,
  IListenerObject,
}
