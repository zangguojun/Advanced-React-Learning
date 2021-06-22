const React = require('./react');
const ReactDOM = require('./react-dom');

class ClassComponent extends React.Component {
  render() {
    return (
      <div className="title" style={{ color: "red" }}>
        <span>{this.props.name}</span>
        {this.props.children}
      </div>
    )
  }
}
let element = <ClassComponent name="hello" children=" world" />
console.log("🚀 ~ file: index.js ~ line 15 ~ element", element)
ReactDOM.render(element, document.getElementById('root'))
