const React = require('react');
const ReactDOM = require('react-dom');

/**
 * 组件的状态和事件处理
 * 属性和状态都是组件的数据源
 * 属性是父组件传入的，自己不能改
 * 状态是自己内部定义的，可以自己更改
 * 1、永远不要直接修改this.state，因为这样不会使视图更新
 * 2、状态可能是异步，处于性能考虑，React会把多个setState合并成一个
 * 3、合并为增量合并，不能直接删除，可以直接用null覆盖
 */
class Counter extends React.Component {
  constructor(props) {
    super()
    this.state = {
      number: 0
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        number: this.state.number + 1
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleAdd = () => {
    this.setState({
      number: this.state.number + 1
    })
  }

  handleDbAddObj = () => {
    // 在事件处理函数中setState的更新会被合并，也就说明调用了setState之后不会立刻修改this.state，this.state还是会保留原值
    this.setState({
      number: this.state.number + 1
    })
    this.setState({
      number: this.state.number + 1
    })
  }
  handleDbAddFunc = () => {
    this.setState(preState => ({
      number: preState.number + 1
    }))
    this.setState(preState => ({
      number: preState.number + 1
    }))
  }
  handleDefine = () => {
    this.setState({
      number: this.state.number + 1
    })
    console.log("🚀1", this.state.number)
    this.setState({
      number: this.state.number + 1
    })
    console.log("🚀2", this.state.number)
    setTimeout(() => {
      // 在setTimeout中的同步并不会合并
      console.log("🚀setTimeout1-1", this.state.number)
      this.setState({
        number: this.state.number + 1
      })
      console.log("🚀setTimeout1-2", this.state.number)
    }, 1000);
    setTimeout(() => {
      console.log("🚀setTimeout2-1", this.state.number)
      this.setState({
        number: this.state.number + 1
      })
      console.log("🚀setTimeout2-2", this.state.number)
    }, 3000);
  }

  handleMulAddObjCb = () => {
    this.setState({ number: this.state.number + 1 }, () => {
      this.setState({ number: this.state.number + 1 }, () => {
        this.setState({ number: this.state.number + 1 }, () => {

        })
      })
    })
  }
  handleStop = () => {
    clearInterval(this.timer);
  }

  handleUnmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleAdd}>加一</button>
        <button onClick={this.handleDbAddObj}>连续加一+对象形式</button>
        <button onClick={this.handleDbAddFunc}>连续加一+函数形式</button>
        <button onClick={this.handleDefine}>验证</button>
        <button onClick={this.handleMulAddObjCb}>连续加一+对象形式+函数回调</button>
        <button onClick={this.handleStop}>暂停</button>
        <button onClick={this.handleUnmount}>卸载</button>
      </div>
    )
  }
}
let element = <Counter />
ReactDOM.render(element, document.getElementById('root'))
