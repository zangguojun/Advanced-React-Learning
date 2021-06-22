import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class App extends Component {
  static defaultProps = {
    name: '陌生人',
    gender: 'male'
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    age(props, propName, componentName) {
      let age = props[propName]
      if (age < 0 || age > 120) {
        return new Error(`Warning: Failed prop type: Invalid prop ${propName} of value ${age} supplied to ${componentName}, expected ${propName} between 0 and 120.`)
      }
    },
    gender: PropTypes.oneOf(['male', 'female']),
    positions: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
  }
  render() {
    const { name, age, gender, hobbies, positions } = this.props
    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
            <th>gender</th>
            <th>hobbies</th>
            <th>positions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{hobbies}</td>
            <td>{`${positions.x}  ${positions.y}`}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
