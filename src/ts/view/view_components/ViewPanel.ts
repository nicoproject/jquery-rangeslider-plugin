import Event from '../../Event/Event'
import { createElement, setAttributes } from '../../core/dom'
import { validateInRange } from '../../core/utils'
import { IEvent, IPanelOptions } from '../ViewInterfaces'

class ViewPanel {
  private skinPanelEvent: IEvent
  private orientationPanelEvent: IEvent
  private stepPanelEvent: IEvent
  private minPanelEvent: IEvent
  private maxPanelEvent: IEvent
  private visibilityPanelEvent: IEvent
  private runnersIdPanelEvent: IEvent
  private positionPanelEvent: IEvent
  private tooltipPanelEvent: IEvent

  /** Set initial received modelState values */
  private $scaleWrapper: HTMLElement
  private currentSkin: string
  private orientation: string

  private step: number
  private min: number
  private max: number
  private scaleVisible: boolean

  private runners: any

  /** Set calculated and constant values */
  private skins: Array<string>
  private orientations: Array<string>
  private headers: Array<string>

  /** Prepare namespaces */
  private $runnersDropdown: HTMLSelectElement
  private $positionInput: HTMLInputElement
  private $tooltipVisible: HTMLInputElement
  /** Create HTML form with values set from Model object  */
  constructor(options: IPanelOptions) {
    if (!options) {
      throw new Error(
        'ViewPanel component critical error: options Objects has to be provided'
      )
    }

    /** Register events collection */
    this.skinPanelEvent = new Event()
    this.orientationPanelEvent = new Event()
    this.stepPanelEvent = new Event()
    this.minPanelEvent = new Event()
    this.maxPanelEvent = new Event()
    this.visibilityPanelEvent = new Event()
    this.runnersIdPanelEvent = new Event()
    this.positionPanelEvent = new Event()
    this.tooltipPanelEvent = new Event()

    /** Set initial received modelState values */
    this.$scaleWrapper = options.$el
    this.currentSkin = options.skin
    this.orientation = options.orientation

    this.step = options.step
    this.min = options.min
    this.max = options.max
    this.scaleVisible = options.scaleVisible

    this.runners = options.runners

    /** Set calculated and constant values */
    this.skins = ['city', 'mario', 'sonic', 'impostor']
    this.orientations = ['horizontal', 'vertical']
    this.headers = ['Слайдер', 'Шкала', 'Бегунки']

    /** Prepare namespaces */
    this.$runnersDropdown
    this.$positionInput
    this.$tooltipVisible

    /** Create HTML-form */
    this.createPanel()
  }

  private createPanel() {
    const $panelWrapper = createElement('form', 'panel__wrapper')
    const $formElements = []

    /** Headers elements */
    let $sliderHeader = createElement('h5', 'header header-slider')
    $sliderHeader.textContent = this.headers[0]
    let $scaleHeader = createElement('h5', 'header header-scale')
    $scaleHeader.textContent = this.headers[1]
    let $runnersHeader = createElement('h5', 'header header-runners')
    $runnersHeader.textContent = this.headers[2]

    /** Labels elements */
    const $labels = []

    /** Skin dropdown */
    const $skinDropdown = createElement(
      'select',
      'dropdown skin-dropdown custom-select custom-select-sm'
    )
    setAttributes($skinDropdown, {
      name: 'skins',
      'data-title': 'Скин: ',
    })

    for (let i = 0; i < this.skins.length; i++) {
      let option = createElement('option')
      option.value = this.skins[i]
      option.text = this.skins[i]
      $skinDropdown.appendChild(option)
    }

    $skinDropdown.value = this.currentSkin

    $skinDropdown.addEventListener('change', (event: MouseEvent) => {
      this.skinPanelEvent.trigger({
        skin: (<HTMLSelectElement>event.target).value,
      })
    })

    /** Orientation dropdown */
    const $orientationDropdown = createElement(
      'select',
      'dropdown orientation-dropdown custom-select custom-select-sm'
    )
    setAttributes($orientationDropdown, {
      name: 'orientation',
      'data-title': 'Ориентация: ',
    })

    for (let i = 0; i < this.orientations.length; i++) {
      let option = createElement('option')
      option.value = this.orientations[i]
      option.text = this.orientations[i]
      $orientationDropdown.appendChild(option)
    }

    $orientationDropdown.value =
      this.orientation === 'vertical'
        ? this.orientations[1]
        : this.orientations[0]

    $orientationDropdown.addEventListener('change', (event: MouseEvent) => {
      this.orientationPanelEvent.trigger({
        orientation: (<HTMLSelectElement>event.target).value,
      })
    })

    /** Scale min input */
    let $scaleMinInput = createElement(
      'input',
      'input min-input form-control-sm'
    )
    setAttributes($scaleMinInput, {
      type: 'text',
      placeholder: 'Минимум',
      value: this.min,
      'data-title': 'Минимум',
    })

    $scaleMinInput.addEventListener('change', (event: MouseEvent) => {
      this.minPanelEvent.trigger({
        scaleMin: (<HTMLInputElement>event.target).value,
      })
    })

    /** Scale max input */
    let $scaleMaxInput = createElement(
      'input',
      'input max-input form-control-sm'
    )
    setAttributes($scaleMaxInput, {
      type: 'text',
      placeholder: 'Максимум',
      value: this.max,
      'data-title': 'Максимум',
    })

    $scaleMaxInput.addEventListener('change', (event: MouseEvent) => {
      this.maxPanelEvent.trigger({
        scaleMax: (<HTMLInputElement>event.target).value,
      })
    })

    /** Scale step input */
    let $scaleStepInput = createElement(
      'input',
      'input step-input form-control-sm'
    )
    setAttributes($scaleStepInput, {
      type: 'text',
      placeholder: 'Шаг',
      value: this.step,
      'data-title': 'Шаг',
    })

    $scaleStepInput.addEventListener('change', (event: MouseEvent) => {
      this.stepPanelEvent.trigger({
        scaleStep: (<HTMLInputElement>event.target).value,
      })
    })

    /** Scale visibility checkbox */
    let $scaleVisible: HTMLInputElement = createElement(
      'input',
      'input scaleVisible-input form-check'
    )
    setAttributes($scaleVisible, {
      type: 'checkbox',
      name: 'scaleVisible',
      value: this.scaleVisible,
      'data-title': 'Шкала видна:',
    })

    $scaleVisible.checked = this.scaleVisible

    $scaleVisible.addEventListener('click', (event: MouseEvent) => {
      this.visibilityPanelEvent.trigger({ scaleVisible: $scaleVisible.checked })
    })

    this.$runnersDropdown = createElement(
      'select',
      'dropdown runners-dropdown custom-select custom-select-sm'
    )
    setAttributes(this.$runnersDropdown, {
      name: 'runners',
      'data-title': 'ID Бегуна: ',
    })

    for (let i = 0; i < this.runners.length; i++) {
      let option = createElement('option')
      option.value = this.runners[i].id
      option.text = this.runners[i].id
      this.$runnersDropdown.appendChild(option)
    }

    this.$runnersDropdown.value = this.runners[0].id

    this.$runnersDropdown.addEventListener('change', (event: MouseEvent) => {
      this.runnersIdPanelEvent.trigger({
        runnerId: (<HTMLSelectElement>event.target).value,
      })
    })

    /** Find runner by chosen id */
    const runnerData = this.runners[
      this.runners.findIndex((x: any) => x.id == this.$runnersDropdown.value)
    ]
    /** Runner position input */
    this.$positionInput = createElement(
      'input',
      'input position-input form-control-sm'
    )

    setAttributes(this.$positionInput, {
      type: 'text',
      placeholder: 'Позиция',
      value: runnerData.position,
      'data-title': 'Позиция',
    })

    this.$positionInput.addEventListener('change', (event: MouseEvent) => {
      let validatedPosition = validateInRange({
        position: Number((<HTMLSelectElement>event.target).value),
        min: this.min,
        max: this.max,
      })

      this.positionPanelEvent.trigger({
        id: +this.$runnersDropdown.value,
        position: validatedPosition,
      })
    })

    /** Runner show tooltip input */
    this.$tooltipVisible = createElement(
      'input',
      'input tooltipVisible-input form-check'
    )
    setAttributes(this.$tooltipVisible, {
      type: 'checkbox',
      name: 'tooltipVisible',
      value: runnerData.showTooltip,
      'data-title': 'Флаг виден:',
    })

    this.$tooltipVisible.checked = runnerData.showTooltip

    this.$tooltipVisible.addEventListener('click', (event) => {
      this.tooltipPanelEvent.trigger({
        id: +this.$runnersDropdown.value,
        showTooltip: this.$tooltipVisible.checked,
      })
    })

    /** Add created HTML elements to array */
    $formElements.push(
      $skinDropdown,
      $orientationDropdown,
      $scaleMinInput,
      $scaleMaxInput,
      $scaleStepInput,
      $scaleVisible,
      this.$runnersDropdown,
      this.$positionInput,
      this.$tooltipVisible
    )

    /** Append all elements to parent form */
    $formElements.forEach(($formElement, i) => {
      /** Generate headings for group */
      let $heading = createElement('h5', 'panel__heading')
      $formElement = this.wrapFormGroup($formElement)
      if (i === 0) {
        $heading.textContent = this.headers[0]
        $formElement.prepend($heading)
      } else if (i === 2) {
        $heading.textContent = this.headers[1]
        $formElement.prepend($heading)
      } else if (i === 6) {
        $heading.textContent = this.headers[2]
        $formElement.prepend($heading)
      }
      $panelWrapper.append($formElement)
    })

    /** Append form to Slider wrapper */
    this.$scaleWrapper.append($panelWrapper)
  }

  private wrapFormGroup($el: HTMLElement) {
    const $wrappedElement = createElement('div', 'form-group')
    const label = createElement('label', 'label')
    label.textContent = $el.dataset.title
    label.append($el)
    $wrappedElement.append(label)
    return $wrappedElement
  }

  private setCurrentRunner(runnerId: number) {
    /** Find runner by chosen id */
    const runnerData = this.runners[
      this.runners.findIndex((x:any) => x.id == runnerId)
    ]

    /** Runners id dropdown */
    this.$runnersDropdown.value = runnerData.id

    /** Runner position input */
    this.$positionInput.value = runnerData.position

    /** Runner show tooltip input */
    this.$tooltipVisible.checked = runnerData.showTooltip

    return this.$runnersDropdown, this.$positionInput, this.$tooltipVisible
  }

  private destroy() {
  }
}

export default ViewPanel
