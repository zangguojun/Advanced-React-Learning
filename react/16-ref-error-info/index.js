import React from './react'
import ReactDOM from './react-dom'

function TextInput(props) {
  return <input ref={props.ref} />
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.formInput = React.createRef();
  }

  getFocus = () => {
    this.formInput.current.focus();
  }

  render() {
    return (
      <div>
        <TextInput ref={this.formInput} />
        <button onClick={this.getFocus}>获取焦点</button>
      </div>
    )
  }

}

ReactDOM.render(<Form />, document.getElementById('root'))