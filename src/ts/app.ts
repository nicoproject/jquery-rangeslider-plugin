import './jquery/jquery-range-slider'

$('.slider-id-1').rangeSlider({
  scale: {
    min: 0,
    max: 400,
    isVisible: true,
  },
  runners: [
    {
      id: 1,
      position: 250,
      showTooltip: true,
    },
  ],
})

// $('.slider-id-2').rangeSlider({
//   runners: [
//     {
//       id: 1,
//       position: 250,
//       showTooltip: true,
//     },
//   ],
//   orientation: 'vertical',
// })

$('.slider-id-3').rangeSlider({
  scale: {
    min: -200,
    max: 400,
    isVisible: true,
  },
  runners: [
    {
      id: 1,
      position: -200,
      showTooltip: true,
    },
    {
      id: 2,
      position: 350,
      showTooltip: true,
    },
  ],
  step: 1,
})

// $('.slider-id-4').rangeSlider({
//   step: 25,
//   runners: [
//     {
//       id: 1,
//       position: 250,
//       showTooltip: true,
//     },
//     {
//       id: 2,
//       position: 350,
//       showTooltip: true,
//     },
//   ],
//   orientation: 'vertical',
// })
