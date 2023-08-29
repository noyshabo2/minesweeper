import React, { useEffect } from 'react'

import './cell.scss'
export default function Cell(props) {
    if(props.status === 'open'){
        return (
          <td className='cell-number' >{props.value}</td>
        )
    }
  return (
    <td className='cell' onClick={props.onClick}></td>
  )
}
