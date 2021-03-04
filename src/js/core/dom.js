function createElement(tag, className = '') {
  const element= document.createElement(tag)
  element.className = className
  return element
}

function setAttributes($el, attrs) {
  for (let key in attrs) {
    $el.setAttribute(key, attrs[key])
  }
}

export { createElement, setAttributes }
