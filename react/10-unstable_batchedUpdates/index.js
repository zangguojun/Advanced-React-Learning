import React from 'react'
import ReactDOM, { unstable_batchedUpdates as batchedUpdates } from 'react-dom';

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
  /**
   * 只要在React的管辖范围内，setState都是异步更新，异步更新能较少渲染次数
   * React调用就是属于React的管辖范围内，如事件处理函数，生命周期钩子等
   * setTimeout，ajax，fetch等都不属于管辖范围
   * 
   * 重点：batchedUpdates
   */
  componentDidMount() {
    // componentDidMount属于React管辖范围内，所以此时setState是异步更新

    console.log('componentDidMount的setState前', this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log('componentDidMount的setState后', this.state.number);

    fetch('./user.json').then(res => {
      console.log(res);;
    }).then(() => {
      // fetch不属于React管辖范围内，所以此时setState是同步更新

      console.log('fetch的setState前', this.state.number);
      this.setState({ number: this.state.number + 1 });
      console.log('fetch的setState后', this.state.number);
    })

    console.log('componentDidMount的setState前', this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log('componentDidMount的setState后', this.state.number);

    fetch('./user.json').then(res => {
      console.log(res);;
    }).then(() => {
      // fetch不属于React管辖范围内，本来此时setState是同步更新，但是因为setState被batchedUpdates包裹，强行将同步改为异步，所以此时异步更新

      console.log('fetch的batchedUpdates的setState最前', this.state.number);
      batchedUpdates(() => {
        console.log('fetch的batchedUpdates的setState前', this.state.number);
        this.setState({ number: this.state.number + 1 });
        console.log('fetch的batchedUpdates的setState后', this.state.number);
      })
      console.log('fetch的batchedUpdates的setState最后', this.state.number);

      console.log('fetch的batchedUpdates的setState最前', this.state.number);
      batchedUpdates(() => {
        console.log('fetch的batchedUpdates的setState前', this.state.number);
        this.setState({ number: this.state.number + 1 });
        console.log('fetch的batchedUpdates的setState后', this.state.number);
      })
      console.log('fetch的batchedUpdates的setState最后', this.state.number);
    })

    console.log('componentDidMount的setState前', this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log('componentDidMount的setState后', this.state.number);
  }

  handleDefine = () => {
    console.log("🚀handleDefine 1", this.state.number)
    this.setState({ number: this.state.number + 1 })
    console.log("🚀handleDefine 2", this.state.number)

    setTimeout(() => {
      console.log('setTimeout的batchedUpdates的setState最前', this.state.number);
      batchedUpdates(() => {
        console.log('setTimeout的batchedUpdates的setState前', this.state.number);
        this.setState({ number: this.state.number + 1 });
        console.log('setTimeout的batchedUpdates的setState后', this.state.number);
      })
      console.log('setTimeout的batchedUpdates的setState最后', this.state.number);
    }, 500);

    setTimeout(() => {
      console.log("🚀setTimeout 1", this.state.number)
      this.setState({ number: this.state.number + 1 })
      console.log("🚀setTimeout 2", this.state.number)
    }, 1000);

    console.log("🚀handleDefine 1", this.state.number)
    this.setState({ number: this.state.number + 1 })
    console.log("🚀handleDefine 2", this.state.number)

    setTimeout(() => {
      console.log('setTimeout的batchedUpdates的setState最前', this.state.number);
      batchedUpdates(() => {
        console.log('setTimeout的batchedUpdates的setState前', this.state.number);
        this.setState({ number: this.state.number + 1 });
        console.log('setTimeout的batchedUpdates的setState后', this.state.number);
      })
      console.log('setTimeout的batchedUpdates的setState最后', this.state.number);
    }, 3000);
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleDefine}>验证</button>
      </div>
    )
  }
}
let element = <Counter />
ReactDOM.render(element, document.getElementById('root'))
