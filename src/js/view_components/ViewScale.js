import Event from '../Event'

class ViewScale {
  /** Creates scale with canvas ruler from options object
   * @param {} options 
   */
  constructor(options = {}) {
    /** Register events collection
     * @todo Refactor
     */
    this.clickScaleEvent = new Event()

    this.$el = options.$el
    this.min = options.min
    this.max = options.max
    this.hasNegative = false
    if (this.min < 0 || this.max < 0) {
      this.range = Math.abs(min) + Math.abs(max)
      this.hasNegative = true
    } else {
      this.range = options.max - options.min
    }
    console.log('ViewScale. constructor this.hasNegative: ', this.hasNegative)
    this.step = options.step
    this.orientation = options.orientation
    this.$scaleWrapper = document.createElement('div')
    this._intervalCount = 0
    this._spacing = 0

    this.init()
  }

  init() {
    /**
     * @todo Refactor - write an util function for creating elements
     * with classes and dataset array
     * @todo
     */
    this.$scaleWrapper.className = 'scale__wrapper'
    this.$scaleWrapper.dataset.min = this.min
    this.$scaleWrapper.dataset.max = this.max
    this.$scaleWrapper.dataset.step = this.step

    this.$scaleWrapper.addEventListener('click', (event) => {
      const clientCoords = this.orientation === 'vertical' ? event.clientY : event.clientX
      this.clickScaleEvent.trigger(clientCoords, this.orientation)

      // console.log('clientCoords', clientCoords)
      console.log('event', event.offsetY)
    })

    this.drawRuler(this.$el)

    console.log('ViewScale. init() this: ', this.clickScaleEvent )
    return this
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
      // Draw start point value
      context.beginPath()
      const text = this.min
      context.moveTo(0, 0)
      context.lineTo(100, 0)
      context.font = '24px Arial'
      context.fillText(this.max, 80, 20)
      context.stroke()

      context.beginPath()
      for (let interval = 0; interval < intervalCount; interval++) {
        // Move cursor to bottom left each iteration
        context.moveTo(0, 0)

        // Draw vertical line on each step
        const intervalValue = ((intervalCount - interval) * this.range).toFixed() / intervalCount
        if (intervalValue !== 0) {
          context.moveTo(0, interval * spacing + lineWidth)
          context.lineTo(75, interval * spacing + lineWidth)

          // stepValues don't work with negative numbers
          if (!this.hasNegative) {
            context.font = '14px Arial'
            context.fillText(
              intervalValue.toFixed(),
              30,
              interval * spacing - 10
            )
          }
          context.stroke()
        }
      }
      // Draw endpoint value
      context.beginPath()
      context.moveTo(0, calculationValue - lineWidth)
      context.lineTo(70, calculationValue - lineWidth)
      context.font = '24px Arial'
      context.fillText(this.min, 60, calculationValue - 3)
      context.stroke()
      // ---------------------- END VERTICAL ----------------------- //
    } else {
      // ---------------------- START HORIZONTAL ----------------------- //
      context.canvas.width = $parentEl.offsetWidth
      context.beginPath()
      // Draw start point value
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
          // stepValues don't work with negative numbers
          if (!this.hasNegative) {
            context.font = '8px Arial'
            context.fillText(intervalValue.toFixed(), interval * spacing, 65)
          }
          context.stroke()
        }
      }
      // Draw endpoint value
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
