import { IDrawRulerArgs } from "../ViewInterfaces"

function drawRuler(args: IDrawRulerArgs) {
  if (args.orientation === 'vertical') {
    /** ---------------------- START VERTICAL -----------------------  */
    this.context.canvas.height = this.scaleLength
    /**  Draw start point value */
    this.context.beginPath()
    this.context.moveTo(0, 0)
    this.context.lineTo(100, 0)
    this.context.font = '24px Arial'
    this.context.fillText(this.max, 80, 20)
    this.context.stroke()

    this.context.beginPath()
    for (let interval = 0; interval < this.intervalCount; interval++) {
      /**  Move cursor to bottom left each iteration  */
      this.context.moveTo(0, 0)

      /**  Draw horizontal line on each step */

      let intervalNumber = (
        (this.intervalCount - interval) *
        this.range
      ).toFixed()
      const intervalValue = Number(intervalNumber) / this.intervalCount
      if (intervalValue !== 0) {
        this.context.moveTo(0, interval * this.spacing + this.lineWidth)
        this.context.lineTo(75, interval * this.spacing + this.lineWidth)

        /**  stepValues don't work with negative numbers */
        this.context.font = '14px Arial'
        this.context.fillText(
          +this.min + +intervalValue.toFixed(),
          30,
          interval * this.spacing - 10
        )
        this.context.stroke()
      }
    }
    /**  Draw endpoint value */
    this.context.beginPath()
    this.context.moveTo(0, this.scaleLength - this.lineWidth)
    this.context.lineTo(70, this.scaleLength - this.lineWidth)
    this.context.font = '24px Arial'
    this.context.fillText(this.min, 60, this.scaleLength - 3)
    this.context.stroke()
    /** ---------------------- END VERTICAL -----------------------  */
  } else {
    /** ---------------------- START HORIZONTAL -----------------------  */
    this.context.canvas.width = this.scaleLength
    this.context.beginPath()
    /**  Draw start point value */
    this.context.moveTo(0, 0)
    this.context.font = '12px Arial'
    this.context.lineTo(0, 75)
    this.context.fillText(this.min, 0, 90)

    for (let interval = 0; interval < this.intervalCount; interval++) {
      /** Move cursor to bottom left each iteration */
      this.context.moveTo(0, 0)

      /** Draw vertical line on each step */
      const intervalValue = (interval * this.range) / this.intervalCount
      if (intervalValue !== 0) {
        this.context.moveTo(interval * this.spacing + this.lineWidth, 0)
        this.context.lineTo(interval * this.spacing + this.lineWidth, 50)
        this.context.font = '8px Arial'
        this.context.fillText(
          +this.min + +intervalValue.toFixed(),
          interval * this.spacing,
          65
        )
        this.context.stroke()
      }
    }
    /** Draw endpoint value */
    this.context.moveTo(this.scaleLength - this.lineWidth, 0)
    this.context.lineTo(this.scaleLength - this.lineWidth, 75)
    this.context.font = '12px Arial'
    this.context.fillText(this.max, this.scaleLength - 40, 90)
    this.context.stroke()
    /** ---------------------- END HORIZONTAL -----------------------  */
  }
}

export { drawRuler }
