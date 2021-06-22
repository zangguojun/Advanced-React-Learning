export const updateQueue = {
  // 是否处于批量更新模式
  // 这里也是setState为什么有时同步更新，有时批量更新
  isBatchingUpdate: false
}
export default class Component {
  constructor(props) {
    this.props = props;
  }
}
Component.prototype.isReactComponent = {};