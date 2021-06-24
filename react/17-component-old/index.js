import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
  // 初始化props，默认属性对象
  static defaultProps = {
    name: 'bu'
  }
  constructor(props) {
    super(props);
    // 初始化state，默认状态对象
    this.state = {
      number: 0
    }
    console.log('1、constructor 初始化状态对象');
  }

  componentWillMount() {
    console.log('2、componentWillMount 组件将要挂载');
  }

  componentDidMount() {
    console.log('4、componentDidMount 组件挂载完成');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('5、shouldComponent 询问用户组件是否需要更新');
    return nextState.number % 2 === 0;
  }

  componentWillUpdate() {
    console.log('6、componentWillUpdate 组件将要更新');
  }
  componentDidUpdate() {
    console.log('6、componentDidUpdate 组件更新完成');
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 })
  }
  render() {
    console.log('3、render 类实例调用render获得虚拟DOM');
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'))