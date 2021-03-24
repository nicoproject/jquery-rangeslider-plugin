import './jquery/jquery-range-slider'

$('.slider-id-1').rangeSlider({
  runners: [
    {
      id: 1,
      position: 250,
      showTooltip: true,
    },
  ],
})

$('.slider-id-2').rangeSlider({
  runners: [
    {
      id: 1,
      position: 250,
      showTooltip: true,
    },
  ],
  orientation: 'vertical',
})

$('.slider-id-3').rangeSlider({
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

$('.slider-id-4').rangeSlider({
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
  orientation: 'vertical',
})
