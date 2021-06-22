import React from './react'
import ReactDOM from './react-dom'


function FunctionComponent(props) {
  return (
    <div className="title" style={{ color: "red" }}>
      <span>{props.name}</span>
      {props.children}
    </div>
  )
}
let element = <FunctionComponent name="hello" children=" world" />
console.log("🚀 ~ file: index.js ~ line 14 ~ element", element)
ReactDOM.render(element, document.getElementById('root'))
