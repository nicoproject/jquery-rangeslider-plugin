import Event from '../Event'
import { createElement, setAttributes } from '../core/dom'

class ViewPanel {
  /** Create HTML form with values set from Model object
   * @param {Object} options
   */
  constructor(options) {
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
    this.setCurrentRunner = this.setCurrentRunner
  }

  createPanel() {
    const $panelWrapper = createElement('div', 'panel__wrapper')
    const $formElements = []

    /** Headers elements */
    let $sliderHeader = createElement('h3', 'header header-slider')
    $sliderHeader.textContent = this.headers[0]
    let $scaleHeader = createElement('h3', 'header header-scale')
    $scaleHeader.textContent = this.headers[1]
    let $runnersHeader = createElement('h3', 'header header-runners')
    $runnersHeader.textContent = this.headers[2]

    /** Skin dropdown */
    const $skinDropdown = createElement('select', 'dropdown skin-dropdown')
    setAttributes($skinDropdown, {
      name: 'skins',
    })

    /** @todo Write util for options or whole select creation */
    for (let i = 0; i < this.skins.length; i++) {
      let option = createElement('option')
      option.value = this.skins[i]
      option.text = this.skins[i]
      $skinDropdown.appendChild(option)
    }

    $skinDropdown.value = this.currentSkin

    $skinDropdown.addEventListener('change', (event) => {
      this.skinPanelEvent.trigger(event.target.value)
    })

    /** Orientation dropdown */
    const $orientationDropdown = createElement(
      'select',
      'dropdown orientation-dropdown'
    )
    setAttributes($orientationDropdown, {
      name: 'orientation',
    })

    /** @todo Consider refactoring without for syntax */
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

    $orientationDropdown.addEventListener('change', (event) => {
      this.orientationPanelEvent.trigger(event.target.value)
      console.log('Orientation has changed')
    })

    /** Scale step input */
    let $scaleStepInput = createElement('input', 'input step-input')
    setAttributes($scaleStepInput, {
      type: 'text',
      placeholder: 'Шаг',
      value: this.step,
    })

    $scaleStepInput.addEventListener('change', (event) => {
      this.stepPanelEvent.trigger(event.target.value)
      console.log('Step has changed')
    })

    /** Scale min input */
    let $scaleMinInput = createElement('input', 'input min-input')
    setAttributes($scaleMinInput, {
      type: 'text',
      placeholder: 'Мин',
      value: this.min,
    })

    $scaleMinInput.addEventListener('change', (event) => {
      this.minPanelEvent.trigger(event.target.value)
      console.log('Min has changed')
    })

    /** Scale max input */
    let $scaleMaxInput = createElement('input', 'input max-input')
    setAttributes($scaleMaxInput, {
      type: 'text',
      placeholder: 'Максимум',
      value: this.max,
    })

    $scaleMaxInput.addEventListener('change', (event) => {
      this.maxPanelEvent.trigger(event.target.value)
      console.log('Max has changed')
    })

    /** Scale visibility checkbox */
    let $scaleVisible = createElement('input', 'input scaleVisible-input')
    setAttributes($scaleVisible, {
      type: 'checkbox',
      name: 'scaleVisible',
      value: this.scaleVisible,
    })

    $scaleVisible.checked = this.scaleVisible

    $scaleVisible.addEventListener('click', (event) => {
      this.visibilityPanelEvent.trigger($scaleVisible.checked)
      console.log('Scale visibility has changed', $scaleVisible.checked)
    })

    this.$runnersDropdown = createElement('select', 'dropdown runners-dropdown')
    setAttributes(this.$runnersDropdown, {
      name: 'runners',
    })

    /** @todo Consider refactoring without for syntax */
    for (let i = 0; i < this.runners.length; i++) {
      let option = createElement('option')
      option.value = this.runners[i].id
      option.text = this.runners[i].id
      this.$runnersDropdown.appendChild(option)
    }

    this.$runnersDropdown.value = this.runners[0].id

    this.$runnersDropdown.addEventListener('change', (event) => {
      this.runnersIdPanelEvent.trigger(event.target.value)
      console.log('Runner has changed')
    })

    /** Find runner by chosen id */
    const runnerData = this.runners[
      this.runners.findIndex((x) => x.id == this.$runnersDropdown.value)
    ]
    /** Runner position input */
    this.$positionInput = createElement('input', 'input position-input')

    setAttributes(this.$positionInput, {
      type: 'text',
      placeholder: 'Позиция',
      value: runnerData.position,
      // value: this.runners.id[$runnersDropdown.value].position,
      // value: this.runners.runnerId.position,
    })

    this.$positionInput.addEventListener('change', (event) => {
      this.positionPanelEvent.trigger({
        id: +this.$runnersDropdown.value,
        position: +event.target.value,
      })
      console.log('Position has changed')
    })

    /** Runner show tooltip input */
    this.$tooltipVisible = createElement('input', 'input tooltipVisible-input')
    setAttributes(this.$tooltipVisible, {
      type: 'checkbox',
      name: 'tooltipVisible',
      value: runnerData.showTooltip,
    })

    this.$tooltipVisible.checked = runnerData.showTooltip

    this.$tooltipVisible.addEventListener('click', (event) => {
      this.tooltipPanelEvent.trigger({
        id: +this.$runnersDropdown.value,
        showTooltip: this.$tooltipVisible.checked,
      })
      console.log(
        'Tooltip visibility has changed',
        this.$tooltipVisible.checked
      )
    })

    /** Add created HTML elements to array */
    $formElements.push(
      $sliderHeader,
      $skinDropdown,
      $orientationDropdown,
      $scaleHeader,
      $scaleMinInput,
      $scaleMaxInput,
      $scaleStepInput,
      $scaleVisible,
      $runnersHeader,
      this.$runnersDropdown,
      this.$positionInput,
      this.$tooltipVisible
    )

    /** Append all elements to parent form */
    $formElements.forEach(($formElement) => {
      $panelWrapper.append($formElement)
    })

    /** Append form to Slider wrapper */
    this.$scaleWrapper.append($panelWrapper)
  }

  setCurrentRunner(runnerId) {
    /** Find runner by chosen id */
    const runnerData = this.runners[
      this.runners.findIndex((x) => x.id == runnerId)
    ]

    /** Runners id dropdown */
    this.$runnersDropdown.value = runnerData.id

    /** Runner position input */
    this.$positionInput.value = runnerData.position

    /** Runner show tooltip input */
    this.$tooltipVisible.checked = runnerData.showTooltip

    return this.$runnersDropdown, this.$positionInput, this.$tooltipVisible
  }

  destroy() {
    console.log('Panel wrapper destroyed')
  }
}

export default ViewPanel
