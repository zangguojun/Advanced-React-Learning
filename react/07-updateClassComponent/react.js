const { Component } = require('./Component');

/**
 * @param {*} type 元素类型
 * @param {*} config 配置对象
 * @param {*} children 第一个儿子，未传入则未undefined
 */
function createElement(type, config, children) {
  let props = { ...config }
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2)
  }
  props.children = children
  return {
    type,
    props
  }
}

module.exports = {
  createElement,
  Component
}