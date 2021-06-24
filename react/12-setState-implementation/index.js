import React from './react'
import ReactDOM from './react-dom';


class Counter extends React.Component {
  constructor(props) {
    super()
    this.state = {
      number: 0
    }
  }

  handleClick1 = () => {
    this.setState(preState => ({
      number: preState.number + 1
    }))
    console.log(this.state.number);

    this.setState(preState => ({
      number: preState.number + 1
    }))
    console.log(this.state.number);

    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number);

    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number);

    setTimeout(() => {
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number);
    }, 1000);
  }

  handleClick2 = () => {
    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number);

    this.setState({ number: this.state.number + 1 })
    console.log(this.state.number);

    this.setState(preState => ({
      number: preState.number + 1
    }))
    console.log(this.state.number);

    this.setState(preState => ({
      number: preState.number + 1
    }))
    console.log(this.state.number);

    setTimeout(() => {
      this.setState({ number: this.state.number + 1 })
      console.log(this.state.number);
    }, 1000);
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick1}>验证1</button>
        <button onClick={this.handleClick2}>验证2</button>
      </div>
    )
  }
}
let element = <Counter />
ReactDOM.render(element, document.getElementById('root'))
