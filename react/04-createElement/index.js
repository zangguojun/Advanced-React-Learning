import React from './react'

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
console.log(element);
console.log(element1);
console.log(element2);