import React, { Component } from 'react';
import firebase from 'firebase'
import ShowScore from './ShowScore'
import './Scoreboard.css'
import {Card, CardText} from 'material-ui/Card';

export default class Scoreboard extends Component{

  constructor(props){
    super(props)
    this.state = {
      open: false,
      latestPoint: {},
      teams: []
    }
    this.teamsRef = null
    this.latestPointRef = null
  }

  componentWillUnmount(){
    if(this.teamsRef){
      this.teamsRef.off()
    }
    if(this.latestPointRef){
      this.latestPointRef.off()
    }
  }

  componentWillMount(){
    this.teamsRef = firebase.database().ref('teams/');
    this.teamsRef.on('value', (snapshot) => {
      let objTeams = snapshot.val()
      if (objTeams){
        this.setState({teams: Object.values(snapshot.val())})
      }else{
        this.setState({teams: []})
      }
    })

    this.latestPointRef = firebase.database().ref('latestPoint/').on('value', (snapshot) => {
      let latestPoint = snapshot.val()
      if(latestPoint){
        this.setState({
          open: true,
          latestPoint: latestPoint
        })
        setTimeout(()=>{
          this.setState({open:false})
        },this.props.delay)
      }
    })
  }

  renderTeam(team){
    return <Team key={team.teamId} team={team}/>
  }

  render(){
    if (this.state.teams) {
      return (
        <div className='team-container'>
          {this.state.teams.sort((a, b) => b.score - a.score).map(this.renderTeam.bind(this))}
          <ShowScore open={this.state.open} latestPoint={this.state.latestPoint} />
        </div>

      )
    }
    return (
      <p>oie</p>
    )
  }

}

const Team = (props) => {
  const pStyle = {
    //color: team.color,
    fontWeight: "bold",
    stroke: "#fff",
    fontSize: 100
  }

  return (
    <Card className='score-team2' style={{background: props.team.color}}>
      <CardText className='show-score-stroke2' style={pStyle}>{props.team.name}</CardText>
      <CardText className='show-score-stroke2' style={pStyle}>{props.team.score}</CardText>
    </Card>
  )
}

Scoreboard.defaultProps = {
  delay: 2500
}
