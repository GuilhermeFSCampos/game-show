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
    fontSize: 350
  }

  let point = props.latestPoint.point
  let name = props.latestPoint.name

  if(point > 0){
    point = '+' + point
  }

  let fontSize = 350

  if(name){
    let characters = name.length
    if (characters <= 9) {
      fontSize = 350
    }else {
      fontSize = 350 - characters * 11
    }
  }

  return (
    <div className="show-score-backdrop">
      <text className="show-score-stroke" style={spanStyle}>
        <span style={{fontSize}}>{name}</span>
        <br/>
        <span>{point}</span>
      </text>
    </div>
  )
}
