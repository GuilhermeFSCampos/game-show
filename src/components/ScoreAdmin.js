import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import ScoreTeam from './ScoreTeam'
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import firebase from 'firebase'

export default class ScoreAdmin extends Component{
  constructor(props){
    super(props)
    this.state = {
      teamcount : 0,
      teams : []
    }
    this.dataRef = null
    this.teamsRef = null
  }

  componentDidMount(){
    this.dataRef = firebase.database().ref('teamcount/');
    this.dataRef.on('value', (snapshot) => {
      this.setState({teamcount: snapshot.val()})
    })
    this.teamsRef = firebase.database().ref('teams/');
    this.teamsRef.on('value', (snapshot) => {
      let objTeams = snapshot.val()
      if (objTeams){
        this.setState({teams: Object.values(snapshot.val())})
      }else{
        this.setState({teams: []})
      }
    })
  }

  renderTeam(team){
    return <ScoreTeam key={team.name} team={team}/>
  }

  addTeam(){
    let newTeamCount = this.state.teamcount + 1
    this.dataRef.set(newTeamCount)
  }

  handleAddTeam(){
    let teamId = 'team'+this.state.teamcount;
    firebase.database().ref('teams/'+teamId).set({
      name: 'Equipe ' + this.state.teamcount,
      score: 0,
      histScore: [],
      teamId: teamId
    })
    this.addTeam()
  }

  render(){
    return (
      <div className='team-container'>
        {this.state.teams.map(this.renderTeam.bind(this))}
        <Card className='score-team'>
          <CardText>Adicionar Equipe</CardText>
          <CardActions>
            <RaisedButton
              backgroundColor={"#BDBDBD"}
              icon={<ContentAddCircle/>}
              onTouchTap={() => this.handleAddTeam()}
            />
          </CardActions>
        </Card>
      </div>

    )
  }
}
