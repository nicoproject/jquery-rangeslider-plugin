function createElement(tag: any, className: string = '') {
  const element = document.createElement(tag)
  element.className = className
  return element
}

function setAttributes($el: HTMLElement, attrs: any) {
  for (let key in attrs) {
    $el.setAttribute(key, attrs[key])
  }
}

export { createElement, setAttributes }
