import React, { Component } from 'react';
import {BarChart, Bar, CartesianGrid,
  XAxis, YAxis, Tooltip, Cell, ReferenceLine,
  ResponsiveContainer} from 'recharts'
import firebase from 'firebase'
import './ScoreGraph.css'
import ShowScore from './ShowScore'

export default class ScoreGraph extends Component{

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


  render(){
    if (this.state.teams) {
      return(
        <div className="graph-container">
          <ResponsiveContainer width="80%" height="80%" minHeight={760}>
            <BarChart
              barCategoryGap="3%"
              layout="vertical"
              data={this.state.teams}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis type="number"/>
              <YAxis type="category" dataKey="name" label={{fontWeight: "bold"}}/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip />
              <ReferenceLine x={0} stroke='#000'/>
              <Bar dataKey="score" label={{fill:"black",fontSize:60, stroke:"#fff", fontWeight: "bold"}}>
                {
                  this.state.teams.sort((a, b) => b.score - a.score).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ShowScore open={this.state.open} latestPoint={this.state.latestPoint} />
        </div>
      )
    }
    return (
      <p>oie</p>
    )
  }
}
 ScoreGraph.defaultProps = {
   delay: 2500
 }
