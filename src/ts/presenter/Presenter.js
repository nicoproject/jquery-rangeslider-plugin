import { getClosest } from '../core/utils'

import Slider from '../model/Model'
import View from '../view/View'

class Presenter {
  constructor(modelState = {}) {
    this.model = new Slider(modelState)
    this.view = new View(this.model)

    /** Setup listeners */
    this.setupListeners()
  }

  /** View user events listeners */
  setupListeners() {
    /** Scale has been clicked on */
    this.view.clickScaleEvent.addListener((clickViewScale) => {
      let runnersPositionsArray = this.model.runners
      runnersPositionsArray = runnersPositionsArray.map(
        (element) => element.position
      )

      let closestRunner = getClosest(runnersPositionsArray, clickViewScale)
      closestRunner = this.model.runners.find(
        (runner) => runner.position === closestRunner
      )
      closestRunner.position = clickViewScale
      let activeRunner = this.view.$runners.$runners[
        this.view.$runners.$runners.findIndex((x) => x.id == closestRunner.id)
      ]
      activeRunner.moveRunner(clickViewScale)

      this.renderBar()

      this.view.$controlPanel.setCurrentRunner(closestRunner.id)
    })

    /** Runner has been moved */
    this.view.moveRunnerEvent.addListener((moveViewRunner) => {
      this.model.options.runners = this.model.options.runners.map((obj) =>
        obj.id === moveViewRunner.id
          ? { ...obj, position: moveViewRunner.position }
          : obj
      )
      this.model.runners = this.model.runners.map((obj) =>
        obj.id === moveViewRunner.id
          ? { ...obj, position: moveViewRunner.position }
          : obj
      )
      this.view.$controlPanel.runners = this.model.runners
      this.view.$controlPanel.setCurrentRunner(moveViewRunner.id)
      this.renderBar()
    })

    /** Skin has been selected */
    this.view.skinSelectedEvent.addListener((selectSkinPanel) => {
      this.model.options.skin = selectSkinPanel
      this.render()
    })

    /** Orientation has been changed */
    this.view.orientationChangedEvent.addListener((selectOrientationPanel) => {
      this.model.options.orientation = selectOrientationPanel
      this.render()
    })

    /** Min has been changed */
    this.view.minChangedEvent.addListener((changeMinPanel) => {
      this.model.options.scale.min = +changeMinPanel
      this.model.scale.min = +changeMinPanel
      this.render()
    })

    /** Min has been changed */
    this.view.maxChangedEvent.addListener((changeMaxPanel) => {
      this.model.options.scale.max = +changeMaxPanel
      this.model.scale.max = +changeMaxPanel
      this.render()
    })

    /** Step has been changed */
    this.view.stepChangedEvent.addListener((changeStepPanel) => {
      this.model.options.step = changeStepPanel
      this.render()
    })

    /** Scale visibility has been changed */
    this.view.visibilityChangedEvent.addListener((changeVisibilityPanel) => {
      this.model.options.scale.isVisible = changeVisibilityPanel
      this.render()
    })

    /** Runner chosen by id in panel */
    this.view.runnerChosenEvent.addListener((changeRunnerPanel) => {
      this.view.$controlPanel.setCurrentRunner(changeRunnerPanel)
    })

    /** Runner position has been changed */
    this.view.positionChangedEvent.addListener((changePositionPanel) => {
      this.model.options.runners = this.model.options.runners.map((obj) =>
        obj.id === changePositionPanel.id
          ? { ...obj, position: changePositionPanel.position }
          : obj
      )
      this.model.runners = this.model.runners.map((obj) =>
        obj.id === changePositionPanel.id
          ? { ...obj, position: changePositionPanel.position }
          : obj
      )

      this.render()

      this.view.$controlPanel.setCurrentRunner(changePositionPanel.id)
    })

    /** Tooltip visibility has been changed */
    this.view.tooltipChangedEvent.addListener((changeTooltipPanel) => {
      this.model.options.runners = this.model.options.runners.map((obj) =>
        obj.id === changeTooltipPanel.id
          ? { ...obj, showTooltip: changeTooltipPanel.showTooltip }
          : obj
      )
      this.model.runners = this.model.runners.map((obj) =>
        obj.id === changeTooltipPanel.id
          ? { ...obj, showTooltip: changeTooltipPanel.showTooltip }
          : obj
      )
      this.render()

      this.view.$controlPanel.setCurrentRunner(changeTooltipPanel.id)
    })

  }

  /** Render */
  render() {
    this.view.destroy()
    this.model.hasNegative = this.model.scaleHasNegative()
    this.model.range = this.model.calculateRange()
    this.view = new View(this.model)
    this.setupListeners()
    this.renderBar()
  }

  renderBar() {
    let bar = this.model.createBar()
    this.view.bar = bar
    this.view.createBar()
  }

  destroy() {}
}

export default Presenter
