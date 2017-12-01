import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import './ScoreTeam.css'
import firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
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
    this.latestPointRef = null
    this.teamRef = null
  }
  componentWillUnmount(){
    if(this.scoreRef){
      this.scoreRef.off();
    }
    if(this.histScoreRef){
      this.histScoreRef.off();
    }
    if(this.latestPointRef){
      this.latestPointRef.off();
    }
    if(this.teamRef){
      this.teamRef.off();
    }
  }

  componentDidMount(){
    let teamId = this.props.team.teamId
    this.scoreRef = firebase.database().ref('teams/'+teamId+'/score');
    this.histScoreRef = firebase.database().ref('teams/'+teamId+'/histScore');
    this.latestPointRef = firebase.database().ref('latestPoint/')
    this.teamRef = firebase.database().ref('teams/'+teamId);
  }

  handleDeleteTeam(){
    this.teamRef.remove()
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
    this.latestPointRef.set({
      point: change,
      color: this.props.team.color,
      name : this.props.team.name
    })
  }

  changeScore(isAdd){
    let newScore = 0
    if(isAdd){
      newScore = parseInt(this.props.team.score) + parseInt(this.state.deltaScore)
    }else{
      newScore = parseInt(this.props.team.score) - parseInt(this.state.deltaScore)
    }
    this.scoreRef.set(newScore)
    this.addHist(isAdd)
  }

  handleScoreChange(isAdd){
    this.changeScore(isAdd)
    this.handleClose()
  }

  render(){
    const actions = [
      <RaisedButton label='Adicionar'
        onTouchTap={() => this.handleScoreChange(true)}/>,
      <RaisedButton label='Remover'
        backgroundColor="#B71C1C"
        onTouchTap={() => this.handleScoreChange(false)}/>
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
          <RaisedButton
            icon={<ActionDeleteForever color='#fff'/>}
            backgroundColor="#B71C1C"
            onTouchTap={this.handleDeleteTeam.bind(this)}
          />
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
