import React, { Component } from 'react'


function PanelHead() {
  return <div className="panel-header">header</div>
}

function PanelBody() {
  return <div className="panel-body">body</div>
}

function PanelFooter() {
  return <div className="panel-footer">footer</div>
}

function Panel() {
  return (
    <div className="panel">
      <PanelHead />
      <PanelBody />
      <PanelFooter />
    </div>
  )
}


export default class App extends Component {
  render() {
    return (
      <Panel />
    )
  }
}
