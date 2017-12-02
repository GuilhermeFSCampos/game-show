import React, { Component } from 'react';
import firebase from 'firebase'
import ShowScore from './ShowScore'
import './Scoreboard.css'
import {Card, CardText} from 'material-ui/Card'
import logo from '../logo.png';

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
    return <Team key={team.teamId} team={team} teamCount={this.state.teams.length}/>
  }

  render(){
    if (this.state.teams && this.state.teams.length > 0) {
      return (
        <div className='team-container'>
          {this.state.teams.sort((a, b) => b.score - a.score).map(this.renderTeam.bind(this))}
          <ShowScore open={this.state.open} latestPoint={this.state.latestPoint} />
        </div>

      )
    }
    return (
      <img src={logo} alt="logo" />
    )
  }

}

const Team = (props) => {
  let fontSize, width

  if (props.teamCount < 5) {
    fontSize = 190
    width = "820px"
  }else if (props.teamCount < 7) {
    fontSize = 120
    width = "500px"
  }else {
    fontSize = 100
    width = "420px"
  }


  const teamStyle = {
    //color: team.color,
    fontWeight: "bold",
    stroke: "#fff",
    fontSize: fontSize
  }

  const teamCardStyle = {
    background: props.team.color,
    width: width,
    height: "420px"
  }

  return (
    <Card className='score-team2' style={teamCardStyle}>
      <CardText className='show-score-stroke2' style={teamStyle}>{props.team.name}</CardText>
      <CardText className='show-score-stroke2' style={teamStyle}>{props.team.score}</CardText>
    </Card>
  )
}

Scoreboard.defaultProps = {
  delay: 2500
}
