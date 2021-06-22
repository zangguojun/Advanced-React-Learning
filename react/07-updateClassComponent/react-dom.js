/**
 * 将virtualDOM转换成真实DOM并且放到parentDOM里面
 * @param {*} virtualDOM 虚拟DOM React元素 也就是一个JS对象
 * @param {*} parentDOM 真实父元素DOM
 */
function render(virtualDOM, parentDOM) {
  let dom = createDOM(virtualDOM);
  parentDOM.appendChild(dom);
}

/**
 * 将虚拟DOM转换成真实DOM
 * @param {} virtualDOM 
 */
function createDOM(virtualDOM) {
  if (typeof virtualDOM === 'string' || typeof virtualDOM === 'number') {
    return document.createTextNode(virtualDOM);
  }
  let { type, props } = virtualDOM;
  let dom;
  if (typeof type === 'function') {
    return type.prototype.isReactComponent ? updateClassComponent(virtualDOM) : updateFunctionComponent(virtualDOM);
  } else {
    dom = document.createElement(type);
  }

  updateProps(dom, props);

  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children;
  } else if (typeof props.children === 'object' && props.children.type) {
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    dom.textContent = props.children ? props.children.toString() : '';
  }
  return dom;
}

/**
 * props的属性赋值给真实DOM（children除外）
 * @param {*} dom 真实DOM
 * @param {*} props 属性对象
 */
function updateProps(dom, props) {
  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {
      if (key === 'children') { continue; }
      else if (key === 'style') {
        let style = props[key];
        for (const attr in style) {
          if (Object.hasOwnProperty.call(style, attr)) {
            dom.style[attr] = style[attr];
          }
        }
      } else {
        dom[key] = props[key];
      }
    }
  }
}

/**
 * props的children赋值给父元素DOM
 * @param {*} children 
 * @param {*} parentDOM 
 */
function reconcileChildren(children, parentDOM) {
  for (let i = 0; i < children.length; i++) {
    render(children[i], parentDOM)
  }
}

function updateFunctionComponent(virtualDOM) {
  let { type, props } = virtualDOM;
  let renderVirtualDOM = new type(props);
  return createDOM(renderVirtualDOM);
}
function updateClassComponent(virtualDOM) {
  let { type, props } = virtualDOM;
  let classInstance = new type(props);
  let renderVirtualDOM = classInstance.render();
  console.log("🚀 ~ file: react-dom.js ~ line 84 ~ updateClassComponent ~ renderVirtualDOM", renderVirtualDOM)
  return createDOM(renderVirtualDOM);
}

module.exports = {
  render,
}