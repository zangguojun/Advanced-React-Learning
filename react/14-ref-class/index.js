import React from './react'
import ReactDOM from './react-dom'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.formInput = React.createRef();
  }
  getFocus = () => {
    this.formInput.current.getFocus();
  }
  render() {
    return (
      <div>
        <TextInput ref={this.formInput}></TextInput>
        <button onClick={this.getFocus}>获取焦点</button>
      </div>
    )
  }
}

class TextInput extends React.Component {
  constructor() {
    super();
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.focus();
  }
  render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    )
  }
}
ReactDOM.render(<Form />, document.getElementById('root'))