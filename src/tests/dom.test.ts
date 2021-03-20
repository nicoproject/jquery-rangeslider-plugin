import { createElement, setAttributes } from '../ts/core/dom'

describe('Test: DOM helper functions', () => {
  const $el: any = createElement('div', 'sample')
  setAttributes($el, {
    'data-sample': 'sample',
  })

  test('Test: createElement() should return HTMLElement', () => {
    expect($el).toBeEmptyDOMElement()
  })

  test('Test: createElement() should assign given classes', () => {
    expect($el).toHaveClass('sample')
  })

  test('Test: setAttributes() should assign given attributes', () => {
    expect($el).toHaveAttribute('data-sample')
  })
})
