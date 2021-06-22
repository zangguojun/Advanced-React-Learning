import React from './react'
import ReactDOM from './react-dom'


let element1 = React.createElement(
  'h2',
  {
    className: 'title',
    style: { color: 'blue' }
  },
  '1'
)
let element2 = React.createElement(
  'h2',
  {
    className: 'title',
    style: { color: 'green' }
  },
  React.createElement(
    'h2',
    {
      className: 'title',
      style: { color: 'green' }
    },
    '2'
  )
)
let element = React.createElement(
  'h2',
  {
    className: 'blue',
    style: { color: 'red' }
  },
  React.createElement(
    'h2',
    {
      className: 'title',
      style: { color: 'blue' }
    },
    '3'
  ),
  '3'
)
ReactDOM.render(element1, document.getElementById('root'))
ReactDOM.render(element2, document.getElementById('root'))
ReactDOM.render(element, document.getElementById('root'))
