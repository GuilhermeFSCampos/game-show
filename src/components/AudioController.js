import React, { Component } from 'react';
import './AudioController.css';
import audios from '../audios'
import Slider from 'material-ui/Slider';
import PlayCard from './PlayCard';

export default class AudioController extends Component {
  constructor(props){
    super(props);
    this.state = {
      volume: 0.5,
    }
  }

  renderAudio(audio){
    return (
      <PlayCard key={audio} name={audio} volume={this.state.volume}></PlayCard>
    );
  }

  handleVolumeChange(value){
    this.setState({volume: value});
  }

  render() {
    audios.sort();
    return (
      <div>
        <div className="volume-container">
          <p>Volume</p>
          <Slider value={this.state.volume}
            onChange={(evt, newValue) => this.handleVolumeChange(newValue)}/>
        </div>
        <div className="audios-container">
          {audios.map(this.renderAudio.bind(this))}
        </div>
      </div>
    );
  }
}
