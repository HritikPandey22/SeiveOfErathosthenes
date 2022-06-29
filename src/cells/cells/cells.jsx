import React, { Component } from 'react'
import Cell from '../cell/cell'

export default class Cells extends Component {
  render() {
    return (
      <div className='Cells'>
        {this.props.cells.map((cell, cellidx) => {
          return (
            <Cell cell={cell} key={ cellidx}/>
          )
        })}
      </div>
    )
  }
}
