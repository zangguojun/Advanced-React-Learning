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
    return true;
  }

  componentWillUpdate() {
    console.log('6、componentWillUpdate 组件将要更新');
  }
  componentDidUpdate() {
    console.log('7、componentDidUpdate 组件更新完成');
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
        {/* <ChildCounter count={this.state.number} /> */}
        {
          this.state.number > 3 ? null : <ChildCounter count={this.state.number} />
        }
      </div>
    )
  }
}

class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0, name: 'bu' };
  }
  componentWillMount() {
    console.log('child 1、componentWillMount');
  }

  componentDidMount() {
    console.log('child 3、componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('child 4、shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('child 5、componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('child 6、componentWillUpdate');
  }

  componentWillReceiveProps(newProps) {
    console.log('child +、componentWillReceiveProps');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 如果返回一个对象，则将这个对象当作要更新的状态对象
    // 如果返回null，则为原状态
    const { count } = nextProps;
    if (count === 1) {
      return { number: count * 2 };
    } else if ((count === 2)) {
      return { number: count * 3 };
    } else {
      return null;
    }
  }

  render() {
    console.log('child 2、render');
    return (
      <div>
        name:{this.state.name}
        props:{this.props.count}
        state:{this.state.number}
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'))