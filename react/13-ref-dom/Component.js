import { isFunction } from "./utils";
import { createDOM } from "./react-dom"
export const updateQueue = {
  // 是否处于批量更新模式
  // true：setState同步更新；false：setState异步更新
  isBatchingUpdate: false,
  // 更新器的数组
  updaters: [],
  // 添加更新器
  add(updater) {
    this.updaters.push(updater);
  },
  // 在核实的时间批量调用所有更新器
  batchUpdate() {
    this.isBatchingUpdate = true;
    this.updaters.forEach(updater => updater.updateComponent());
    this.updaters.length = 0;
    this.isBatchingUpdate = false;
  }
}
export const unstable_batchedUpdates = (callback) => {
  updateQueue.isBatchingUpdate = true;
  callback();
  updateQueue.isBatchingUpdate = false;
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    // 这个是用来缓存所有的状态
    this.pendingStates = [];
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    /**
      * 判断当前是否处于批量更新模式，如果
      * 是则先添加到更新队列等待更新
      * 否则说明处理非批量更新模式（同步），直接更新组件
      */
    updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
  }
  // 组件更新
  updateComponent() {
    let { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) {
      classInstance.state = this.getState();
      classInstance.forceUpdate();
    }
  }

  getState() {
    let { classInstance: { state }, pendingStates } = this;
    // 基础版
    // let nextState = state;
    // pendingStates.forEach(partialState => {
    //   if (isFunction(partialState)) {
    //     nextState = partialState(nextState);
    //   } else {
    //     nextState = { ...nextState, ...partialState }
    //   }
    // })
    let nextState = pendingStates.reduce((nextState, partialState) => {
      if (isFunction(partialState)) {
        nextState = partialState(nextState);
      } else {
        nextState = { ...nextState, ...partialState }
      }
      return nextState;
    }, state)
    pendingStates.length = 0
    return nextState;
  }

}
export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.$updater = new Updater(this)
  }
  setState(partialState) {
    this.$updater.addState(partialState)
  }
  // 重新调用render()
  forceUpdate() {
    let newVirtualDOM = this.render();
    let newDOM = createDOM(newVirtualDOM);
    let oldDOM = this.dom;
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);
    this.dom = newDOM;
  }
}

Component.prototype.isReactComponent = {};