import { updateQueue } from "./Component";
/**
 * React不是直接绑定dom[eventType] = listener;
 * 而是采用一种合成事件的方式来处理，是一种事件委托
 * 合成事件：不管给哪个DOM绑定事件，都会绑定到document上
 *    1、提升性能，可以快速回收event对象
 *    2、提升兼容性，可以屏蔽浏览器差异
 * @param {*} dom 要绑定事件的真实DOM元素，如button
 * @param {*} eventType 绑定事件的类型，如onclick
 * @param {*} listener 事件回调函数
 */
export const addEvent = (dom, eventType, listener) => {
  let store = dom.store || (dom.store = {});
  store[eventType] = listener;
  // addEventListener('on后面的',事件处理函数,是否冒泡阶段捕获)
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
}

let syntheticEvent = {};
function dispatchEvent(event) {
  // target是dom元素，如button type是on后面的，如，click
  let { target, type } = event;
  let eventType = 'on' + type;
  let { store } = target;
  // 可以使用while + target = target.parentNode()手动实现冒泡
  let listener = store && store[eventType];
  if (listener) {
    syntheticEvent.nativeEvent = event;
    for (const key in event) {
      syntheticEvent[key] = event[key];
    }
    // 退出同步更新模式，进入批量更新模式
    updateQueue.isBatchingUpdate = true;
    listener.call(null, syntheticEvent)
    updateQueue.isBatchingUpdate = false;
    for (const key in event) {
      syntheticEvent[key] = null;
    }
  }
}
