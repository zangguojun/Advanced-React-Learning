import React from 'react'
import ReactDOM from 'react-dom'

const ForwardTextInput = React.forwardRef((props, ref) => <input ref={ref} />)

class Form extends React.Component {
  constructor() {
    super();
    this.formInput = React.createRef();
  }

  getFocus = () => {
    this.formInput.current.focus();
  }

  render() {
    return (
      <div>
        <ForwardTextInput ref={this.formInput} />
        <button onClick={this.getFocus}>获取焦点</button>
      </div>
    )
  }
}

ReactDOM.render(<Form />, document.getElementById('root'))