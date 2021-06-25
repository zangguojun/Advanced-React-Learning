import React from './react'
import ReactDOM from './react-dom'

class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      message: []
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        message: [`${this.state.message.length}`, ...this.state.message]
      })
    }, 1000);
  }
  // 在重新渲染之前触发
  getSnapshotBeforeUpdate() {
    return {
      preScrollTop: this.wrapper.current.scrollTop,
      preScrollHeight: this.wrapper.current.scrollHeight,
    }
  }

  componentDidUpdate(prevProps, prevState, { preScrollTop, preScrollHeight }) {
    let wrapper = this.wrapper.current;
    wrapper.scrollTop = wrapper.scrollHeight - preScrollHeight + preScrollTop;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    let styleObj = {
      height: '100px',
      width: '200px',
      border: '2px solid red',
      overflow: 'auto'
    }
    return (
      <div style={styleObj} ref={this.wrapper}>
        {
          this.state.message.map((message, index) => (
            <div key={index}>
              {message}
            </div>
          ))
        }
      </div>
    )
  }
}
ReactDOM.render(<ScrollList />, document.getElementById('root'));