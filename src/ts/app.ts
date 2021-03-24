import './jquery/jquery-range-slider'

// @ts-ignore
$('body').rangeSlider({
  runners: [
    {
      id: 1,
      position: 250,
      showTooltip: true,
    },
    {
      id: 2,
      position: 350,
      showTooltip: true,
    },
  ],
})
