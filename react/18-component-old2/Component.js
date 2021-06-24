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
    this.emitUpdate();
  }

  emitUpdate(nextProps) {
    if (this.classInstance.componentWillReceiveProps) {
      this.classInstance.componentWillReceiveProps(nextProps);
    }
    this.nextProps = nextProps;
    if (this.nextProps || !updateQueue.isBatchingUpdate) {
      this.updateComponent();
    } else {
      updateQueue.add(this)
    }
  }

  // 组件更新
  updateComponent() {
    let { classInstance, pendingStates, nextProps } = this;
    // 如果属性或者状态变化
    if (nextProps || pendingStates.length > 0) {
      this.shouldUpdate(classInstance, nextProps, this.getState());
      // classInstance.state = this.getState();
      // classInstance.forceUpdate();
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

  shouldUpdate(classInstance, nextProps, nextState) {
    classInstance.props = nextProps || classInstance.props;
    classInstance.state = nextState || classInstance.state;

    // 如果有shouldComponentUpdate方法，并且他的返回值是false
    if (classInstance.shouldComponentUpdate && (!classInstance.shouldComponentUpdate(nextProps, nextState))) {
      return;
    }
    // 没有shouldComponentUpdate方法，或者返回值为true
    classInstance.forceUpdate();
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
    if (this.componentWillUpdate) {
      this.componentWillUpdate();
    }
    let newVirtualDOM = this.render();
    let newDOM = createDOM(newVirtualDOM);
    let oldDOM = this.dom;
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);
    this.dom = newDOM;
    if (this.componentDidUpdate) {
      this.componentDidUpdate();
    }
  }
}

Component.prototype.isReactComponent = {};