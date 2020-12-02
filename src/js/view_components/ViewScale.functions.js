function drawRuler(args) {
  const that = args.this
  const context = args.context
  if (args.orientation === 'vertical') {
    // ---------------------- START VERTICAL ----------------------- //
    context.canvas.height = that.$el.offsetHeight
    // Draw start point value
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(100, 0)
    context.font = '24px Arial'
    context.fillText(that.max, 80, 20)
    context.stroke()

    context.beginPath()
    for (let interval = 0; interval < intervalCount; interval++) {
      // Move cursor to bottom left each iteration
      context.moveTo(0, 0)

      // Draw vertical line on each step
      const intervalValue =
        ((intervalCount - interval) * that.range).toFixed() / intervalCount
      if (intervalValue !== 0) {
        context.moveTo(0, interval * spacing + lineWidth)
        context.lineTo(75, interval * spacing + lineWidth)

        // stepValues don't work with negative numbers
        if (!that.hasNegative) {
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
    context.fillText(that.min, 60, calculationValue - 3)
    context.stroke()
    // ---------------------- END VERTICAL ----------------------- //
  } else {
    // ---------------------- START HORIZONTAL ----------------------- //
    context.canvas.width = $parentEl.offsetWidth
    context.beginPath()
    // Draw start point value
    context.moveTo(0, 0)
    context.font = '12px Arial'
    context.lineTo(0, 75)
    context.fillText(that.min, 0, 90)

    for (let interval = 0; interval < intervalCount; interval++) {
      // Move cursor to bottom left each iteration
      context.moveTo(0, 0)

      // Draw vertical line on each step
      const intervalValue = (interval * that.range) / intervalCount
      if (intervalValue !== 0) {
        context.moveTo(interval * spacing + lineWidth, 0)
        context.lineTo(interval * spacing + lineWidth, 50)
        // stepValues don't work with negative numbers
        if (!that.hasNegative) {
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
    context.fillText(that.max, $parentEl.offsetWidth - 40, 90)
    context.stroke()
    // ---------------------- END HORIZONTAL ----------------------- //
  }
}

export { drawRuler }

