import React from './react'
import ReactDOM from './react-dom'
class Counter extends React.Component {
  constructor(props) {
    super()
    this.state = {
      number: 0
    }
  }
  handleClick = (event) => {
    console.log(event);
  }
  render() {
    return (
      <div onClick={() => alert('父类冒泡')}>
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}
let element = <Counter />
ReactDOM.render(element, document.getElementById('root'))
