function createElement(tag, className) {
  const element= document.createElement(tag)
  element.className = className
  return element
}

function setAttributes($el, attrs) {
  for (let key in attrs) {
    $el.setAttribute(key, attrs[key])
  }
}

// export function camelToDashCase(str) {
//   return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
// }

// export function toInlineStyles(styles = {}) {
//   return Object.keys(styles)
//     .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
//     .join(';')
// }

// export function debounce(fn, wait) {
//   let timeout
//   return function (...args) {
//     const later = () => {
//       clearTimeout(timeout)
//       // eslint-disable-next-line no-invalid-this
//       fn.apply(this, args)
//     }
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//   }
// }


export { createElement, setAttributes }
