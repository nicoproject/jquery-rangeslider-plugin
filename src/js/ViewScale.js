import Event from './Event'

class ViewScale {
  constructor($el, min, max, step, orientation) {
    this.$el = $el
    this.min = min
    this.max = max
    if (min < 0 || max < 0) {
      this.range = Math.abs(min) + Math.abs(max)
    } else {
      this.range = max - min
    }
    this.step = step
    this.orientation = orientation
    this.$scaleWrapper = document.createElement('div')
    this._intervalCount = 0
    this._spacing = 0

    this.init()
  }

  init() {
    this.$scaleWrapper.className = 'scale__wrapper'
    this.$scaleWrapper.dataset.min = this.min
    this.$scaleWrapper.dataset.max = this.max
    this.$scaleWrapper.dataset.step = this.step

    this.drawRuler(this.$el)
    return this.$scaleWrapper
  }

  drawRuler($parentEl) {
    const canvas = document.createElement('canvas')
    canvas.className = 'scale__ruler'
    const calculationValue =
      this.orientation === 'vertical'
        ? $parentEl.offsetHeight
        : $parentEl.offsetWidth
    console.log('ViewScale. drawRuler calculationValue: ', calculationValue)
    let spacing = this.step
    const lineWidth = 1
    let intervalCount = this.range / spacing
    this._intervalCount = intervalCount
    this._spacing = (calculationValue / this._intervalCount).toFixed()
    if (intervalCount >= 20) {
      intervalCount = 20
    }
    spacing = (calculationValue / intervalCount).toFixed()
    console.log(
      'ViewScale. drawRuler() intervalCount: ',
      intervalCount,
      this._intervalCount,
      spacing,
      this._spacing
    )

    const context = canvas.getContext('2d')
    context.lineWidth = lineWidth
    context.strokeStyle = '#ff000'

    if (this.orientation === 'vertical') {
      // ---------------------- START VERTICAL ----------------------- //
      console.log(
        'ViewScale drawRuler $parentEl.offsetHeight: ',
        $parentEl.offsetHeight
      )
      context.canvas.height = $parentEl.offsetHeight
      context.beginPath()
      // Draw startpoint value
      const text = this.min
      context.moveTo(0, 0)
      context.lineTo(100, 0)
      context.font = '24px Arial'
      context.fillText(this.min, 80, 20)
      context.stroke()

      for (let interval = 0; interval < intervalCount; interval++) {
        // Move cursor to bottom left each iteration
        context.moveTo(0, 0)

        // Draw vertical line on each step
        const intervalValue = (interval * this.range) / intervalCount
        if (intervalValue !== 0) {
          context.moveTo(0, interval * spacing + lineWidth)
          context.lineTo(75, interval * spacing + lineWidth)
          // stepValues doesnt work with negative numbers
          context.font = '14px Arial'
          context.fillText(intervalValue.toFixed(), 30, interval * spacing - 10)
          context.stroke()
        }
      }
      // Draw endpoint value
      context.moveTo(0, calculationValue - lineWidth)
      context.lineTo(70, calculationValue - lineWidth)
      context.font = '24px Arial'
      context.fillText(this.max, 60, calculationValue - 3)
      context.stroke()
      // ---------------------- END VERTICAL ----------------------- //
    } else {
      // ---------------------- START HORIZONTAL ----------------------- //
      context.canvas.width = $parentEl.offsetWidth
      context.beginPath()
      // Draw startpoint value
      const text = this.min
      context.moveTo(0, 0)
      context.font = '12px Arial'
      context.lineTo(0, 75)
      context.fillText(text, 0, 90)

      for (let interval = 0; interval < intervalCount; interval++) {
        // Move cursor to bottom left each iteration
        context.moveTo(0, 0)

        // Draw vertical line on each step
        const intervalValue = (interval * this.range) / intervalCount
        if (intervalValue !== 0) {
          context.moveTo(interval * spacing + lineWidth, 0)
          context.lineTo(interval * spacing + lineWidth, 50)
          // stepValues doesnt work with negative numbers
          context.font = '8px Arial'
          context.fillText(intervalValue.toFixed(), interval * spacing, 65)
          context.stroke()
        }
      }
      // Draw startpoint value
      context.moveTo($parentEl.offsetWidth - lineWidth, 0)
      context.lineTo($parentEl.offsetWidth - lineWidth, 75)
      context.font = '12px Arial'
      context.fillText(this.max, $parentEl.offsetWidth - 40, 90)
      context.stroke()
      // ---------------------- END HORIZONTAL ----------------------- //
    }

    this.$scaleWrapper.append(canvas)
  }
}

export default ViewScale
