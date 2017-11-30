import React, { Component } from 'react';
import './ShowScore.css'

export default class ShowScore extends Component {

  render(){
    return this.props.open ? <Modal latestPoint={this.props.latestPoint}/> : <span />
  }
}

const Modal = (props) => {
  const spanStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
    color: props.latestPoint.color,
    fontWeight: "bold",
    stroke: "#fff",
    fontSize: 300
  }

  let point = props.latestPoint.point
  let name = props.latestPoint.name

  if(point > 0){
    point = '+' + point
  }

  point = name + ': ' + point

  return (
    <div className="show-score-backdrop">
      <text className="show-score-stroke" style={spanStyle}>
        {point}
      </text>
    </div>
  )
}
