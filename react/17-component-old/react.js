import Component from "./Component"
/**
 * @param {*} type 元素类型
 * @param {*} config 配置对象
 * @param {*} children 第一个儿子，未传入则未undefined
 */
function createElement(type, config, children) {
  let ref;
  if (config) {
    ref = config.ref;
  }
  let props = { ...config }
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2)
  }
  props.children = children
  return {
    type,
    props,
    ref
  }
}

function createRef() {
  return {
    current: null
  }
}

function forwardRef(FunctionComponent) {
  return class extends Component {
    render() {
      return FunctionComponent(this.props, this.props.ref);
    }
  }
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef
}
export default React;