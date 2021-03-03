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

    /** Set initial received modelState values */
    this.$scaleWrapper = options.$el
    this.currentSkin = options.skin
    this.orientation = options.orientation

    this.step = options.step
    this.min = options.min
    this.max = options.max
    this.scaleVisible = options.scaleVisible

    this.runners = options.runners
    this.currentRunnerId
    this.currentRunnerPosition
    this.currentRunnerTooltip

    /** Set calculated and constant values */
    this.skins = ['city', 'mario', 'sonic', 'impostor']
    this.orientations = ['horizontal', 'vertical']

    /** Create HTML-form */
    this.createPanel()
  }

  createPanel() {
    const $panelWrapper = createElement('div', 'panel__wrapper')
    const $formElements = []

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

    /** Add created HTML elements to array */
    $formElements.push(
      $skinDropdown,
      $orientationDropdown,
      $scaleMinInput,
      $scaleMaxInput,
      $scaleStepInput
    )

    /** Append all elements to parent form */
    $formElements.forEach(($formElement) => {
      $panelWrapper.append($formElement)
    })

    /** Append form to Slider wrapper */
    this.$scaleWrapper.append($panelWrapper)
  }

  destroy() {
    console.log('Panel wrapper destroyed')
  }
}

export default ViewPanel
