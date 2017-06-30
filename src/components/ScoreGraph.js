import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts'
import firebase from 'firebase'
import './ScoreGraph.css'

export default class ScoreGraph extends Component{

  constructor(props){
    super(props)
    this.state = {
      teams: []
    }
    this.teamsRef = null
  }

  componentDidMount(){
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

  render(){
    if (this.state.teams) {
      return(
        <div className="graph-container">
        <BarChart width={600} height={300} className="score-graph"
          data={this.state.teams}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <Tooltip />
          <Bar dataKey="score" fill="#8884d8" label={{fontSize:20, fontWeight: "bold"}}/>
        </BarChart>
        </div>
      )
    }
    return (
      <p>oie</p>
    )
  }
}
