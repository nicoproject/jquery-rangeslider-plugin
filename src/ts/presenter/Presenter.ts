import { getClosest } from '../core/utils'

import Slider from '../model/Model'
import View from '../view/View'
import {
  IListenerObject,
  IModelOptions,
  IRunnersArray,
} from '../view/ViewInterfaces'

class Presenter {
  private model: any
  private view: any
  constructor(modelState: IModelOptions, $parentEl: HTMLElement) {
    this.model = new Slider(modelState)
    this.view = new View(this.model, $parentEl)

    /** Setup listeners */
    this.setupListeners()
  }

  /** View user events listeners */
  private setupListeners() {
    /** Scale has been clicked on */
    this.view.clickScaleEvent.addListener(
      (clickViewScale: { clickPoint: number }) => {
        let runnersPositionsArray = this.model.runners
        runnersPositionsArray = runnersPositionsArray.map(
          (element: IRunnersArray) => element.position
        )

        let closestRunnerPosition = getClosest(
          runnersPositionsArray,
          clickViewScale.clickPoint
        )
        let closestRunner = this.model.runners.find(
          (runner: any) => runner.position === closestRunnerPosition
        )
        closestRunner.position = clickViewScale.clickPoint
        let activeRunner = this.view.$runners.$runners[
          this.view.$runners.$runners.findIndex(
            (x: IRunnersArray) => x.id == closestRunner.id
          )
        ]
        activeRunner.moveRunner(clickViewScale.clickPoint)

        this.renderBar()
        this.view.$controlPanel.setCurrentRunner(closestRunner.id)
      }
    )

    /** Runner has been moved */
    this.view.moveRunnerEvent.addListener((moveViewRunner: IRunnersArray) => {
      this.model.options.runners = this.model.options.runners.map(
        (obj: IRunnersArray) =>
          obj.id === moveViewRunner.id
            ? { ...obj, position: moveViewRunner.position }
            : obj
      )
      this.model.runners = this.model.runners.map((obj: IRunnersArray) =>
        obj.id === moveViewRunner.id
          ? { ...obj, position: moveViewRunner.position }
          : obj
      )
      this.view.$controlPanel.runners = this.model.runners
      this.view.$controlPanel.setCurrentRunner(moveViewRunner.id)
      this.renderBar()
    })

    /** Skin has been selected */
    this.view.skinSelectedEvent.addListener(
      (selectSkinPanel: IListenerObject) => {
        this.model.options.skin = selectSkinPanel.skin
        this.render()
      }
    )

    /** Orientation has been changed */
    this.view.orientationChangedEvent.addListener(
      (selectOrientationPanel: IListenerObject) => {
        this.model.options.orientation = selectOrientationPanel.orientation
        this.render()
      }
    )

    /** Min has been changed */
    this.view.minChangedEvent.addListener((changeMinPanel: IListenerObject) => {
      this.model.options.scale.min = Number(changeMinPanel.scaleMin)
      this.model.scale.min = Number(changeMinPanel.scaleMin)
      this.model.setupRunners(this.model.runners)
      console.log(this.model)
      this.render()
    })

    /** Min has been changed */
    this.view.maxChangedEvent.addListener((changeMaxPanel: IListenerObject) => {
      this.model.options.scale.max = Number(changeMaxPanel.scaleMax)
      this.model.scale.max = Number(changeMaxPanel.scaleMax)
      this.render()
    })

    /** Step has been changed */
    this.view.stepChangedEvent.addListener(
      (changeStepPanel: IListenerObject) => {
        this.model.options.step = changeStepPanel.scaleStep
        this.render()
      }
    )

    /** Scale visibility has been changed */
    this.view.visibilityChangedEvent.addListener(
      (changeVisibilityPanel: IListenerObject) => {
        this.model.options.scale.isVisible = changeVisibilityPanel.scaleVisible
        this.render()
      }
    )

    /** Runner chosen by id in panel */
    this.view.runnerChosenEvent.addListener(
      (changeRunnerPanel: IListenerObject) => {
        this.view.$controlPanel.setCurrentRunner(changeRunnerPanel.runnerId)
      }
    )

    /** Runner position has been changed */
    this.view.positionChangedEvent.addListener(
      (changePositionPanel: IRunnersArray) => {
        this.model.options.runners = this.model.options.runners.map(
          (obj: IRunnersArray) =>
            obj.id === changePositionPanel.id
              ? { ...obj, position: changePositionPanel.position }
              : obj
        )
        this.model.runners = this.model.runners.map((obj: IRunnersArray) =>
          obj.id === changePositionPanel.id
            ? { ...obj, position: changePositionPanel.position }
            : obj
        )

        this.render()

        this.view.$controlPanel.setCurrentRunner(changePositionPanel.id)
      }
    )

    /** Tooltip visibility has been changed */
    this.view.tooltipChangedEvent.addListener(
      (changeTooltipPanel: IRunnersArray) => {
        this.model.options.runners = this.model.options.runners.map(
          (obj: IRunnersArray) =>
            obj.id === changeTooltipPanel.id
              ? { ...obj, showTooltip: changeTooltipPanel.showTooltip }
              : obj
        )
        this.model.runners = this.model.runners.map((obj: IRunnersArray) =>
          obj.id === changeTooltipPanel.id
            ? { ...obj, showTooltip: changeTooltipPanel.showTooltip }
            : obj
        )
        this.render()

        this.view.$controlPanel.setCurrentRunner(changeTooltipPanel.id)
      }
    )
  }

  /** Render */
  private render() {
    let $parentEl = this.view.$mainWrapper.parentElement
    this.view.destroy()
    this.model.hasNegative = this.model.scaleHasNegative()
    this.model.range = this.model.calculateRange()
    this.view = new View(this.model, $parentEl)
    this.setupListeners()
    this.renderBar()
  }

  renderBar() {
    let bar = this.model.createBar()
    this.view.bar = bar
    this.view.createBar()
  }

  private destroy() {}
}

export default Presenter
