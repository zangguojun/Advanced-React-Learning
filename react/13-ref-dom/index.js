import React from './react'
import ReactDOM from './react-dom';

/**
 * 事件和ref
 * DOM => onclick
 * React => onClick
 * 事件处理函数的this绑定的几个方法
 *    1、箭头函数
 *    2、this.handleClick.bind(this)
 *    3、event => this.handleClick(event)（适用于想要传参的情况）
 */
class Link extends React.Component {
  // 事件合成，event是React的事件对象，并不是原生事件对象
  handleClick(event) {
    console.log(this);
    // 阻止默认行为
    // 错误方式：return false;
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <a href='http://www.baidu.com' onClick={this.handleClick.bind(this)}>点击</a>
      </div>
    )
  }
}

/**
 * ref 提供永续我们访问DOM元素的方式
 *    1、ref值是一个字符串，ref='r1'，已经废弃
 *    2、ref值是一个函数，ref={x => this.r1 = x;}，已经废弃
 *    3、ref值是一个对象，一个current属性指向真实的DOM元素
 */
class Calculator1 extends React.Component {
  add1 = () => {
    this.refs.r3.value = Number(this.refs.r1.value) + Number(this.refs.r2.value);
  }
  render() {
    return (
      <div>
        <input ref='r1' />+<input ref='r2' />=
        <button onClick={this.add1}>add</button>
        <input ref='r3' />
      </div>
    )
  }
}
class Calculator2 extends React.Component {
  add2 = () => {
    this.r3.value = Number(this.r1.value) + Number(this.r2.value);
  }
  render() {
    return (
      <div>
        <input ref={x => this.r1 = x} />+<input ref={x => this.r2 = x} />=
        <button onClick={this.add2}>add</button>
        <input ref={x => this.r3 = x} />
      </div>
    )
  }
}

class Calculator3 extends React.Component {
  constructor(props) {
    super(props);
    this.r1 = React.createRef();
    this.r2 = React.createRef();
    this.r3 = React.createRef();
  }
  add3 = () => {
    this.r3.current.value = Number(this.r1.current.value) + Number(this.r2.current.value);
  }
  render() {
    return (
      <div>
        <input ref={this.r1} />+<input ref={this.r2} />=
        <button onClick={this.add3}>add</button>
        <input ref={this.r3} />
      </div>
    )
  }
}

class Sum extends React.Component {
  render() {
    return (
      <div>
        {/* <Link /> */}
        {/* <Calculator1 /> */}
        {/* <Calculator2 /> */}
        <Calculator3 />
      </div>
    )
  }
}

ReactDOM.render(<Sum />, document.getElementById('root'))
