import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import './ScoreTeam.css'
import firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class ScoreTeam extends Component{

  constructor(props){
    super(props)
    this.state = {
      open: false,
      deltaScore: 0,
    }
    this.scoreRef = null
    this.histScoreRef = null
  }
  componentWillUnmount(){
    if(this.scoreRef){
      this.scoreRef.off();
    }
    if(this.histScoreRef){
      this.histScoreRef.off();
    }
  }

  componentDidMount(){
    this.scoreRef = firebase.database().ref('teams/'+this.props.team.teamId+'/score');
    this.histScoreRef = firebase.database().ref('teams/'+this.props.team.teamId+'/histScore');
  }

  handleOpen(){
    this.setState({open: true})
  }

  handleClose(){
    this.setState({open: false})
  }

  handleChange(event, newValue){
    this.setState({deltaScore: newValue})
  }

  addHist(isAdd){
    let change = parseInt(this.state.deltaScore)
    if(!isAdd){
      change *= -1
    }
    let newHistKey = this.histScoreRef.push().key
    this.histScoreRef.child(newHistKey).set(change)
  }

  addScore(){
    let currentScore = parseInt(this.props.team.score) + parseInt(this.state.deltaScore)
    this.scoreRef.set(currentScore)
    this.addHist(true)
  }

  subtractScore(){
    let currentScore = parseInt(this.props.team.score) - parseInt(this.state.deltaScore)
    this.scoreRef.set(currentScore)
    this.addHist(false)
  }

  handleAddScore(){
    this.addScore()
    this.handleClose()
  }

  handleSubtractScore(){
    this.subtractScore()
    this.handleClose()
  }


  render(){
    const actions = [
      <RaisedButton label='Adicionar'
        onTouchTap={this.handleAddScore.bind(this)}/>,
      <RaisedButton label='Remover'
        backgroundColor="#B71C1C"
        onTouchTap={this.handleSubtractScore.bind(this)}/>
    ]
    const dialogStyle = {
      background: this.props.team.color
    }
    return (
      <div>
      <Card className='score-team' style={{background: this.props.team.color}}>
        <CardText>{this.props.team.name}</CardText>
        <CardText>{this.props.team.score}</CardText>
        <CardActions>
          <RaisedButton label="Pontos" onTouchTap={this.handleOpen.bind(this)}/>
        </CardActions>
      </Card>
      <Dialog paperProps={{style: dialogStyle}}
        title={'Alterar pontuação - '+this.props.team.name}
        actions={actions}
        model={false}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}>
        <TextField type="number" hintText="Valor da pontuação" onChange={this.handleChange.bind(this)}/>
      </Dialog>
      </div>
    )
  }
}
