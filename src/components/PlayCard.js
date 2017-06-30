import React, { Component } from 'react';
import Pause from 'material-ui/svg-icons/av/pause';
import Stop from 'material-ui/svg-icons/av/stop';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import {Card, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class PlayCard extends Component{
  audio = null;
  constructor(props) {
    super(props);
    this.audio = new Audio(process.env.PUBLIC_URL+'/audios/'+props.name);
    this.audio.volume = props.volume;
    this.state = {
      label: props.name.replace('.mp3', ''),
      isPlaying: false,
    };
  }

  componentWillMount(nextProps){
    this.audio.addEventListener('ended', this.handlePlayEnd.bind(this));
  }

  componentWillReceiveProps(nextProps){
    this.audio.volume = nextProps.volume;
  }

  handlePlayEnd(){
    this.setState({isPlaying: false});
  }

  handleClick(isPause){
    let {isPlaying} = this.state;
    if (isPause && isPlaying) {
      this.audio.pause();
    }else if (!isPause && isPlaying) {
      this.audio.load();
    }else if (!isPlaying) {
      this.audio.play();
    }
    this.setState({isPlaying: !isPlaying});
  }

  render(){
    let {isPlaying} = this.state;
    return(
      <Card className='btn-sound'>
        <CardText>{this.state.label}</CardText>
        <CardActions className="btn-sound-actions">
          <RaisedButton
            backgroundColor={ isPlaying ? "#B71C1C" : "#BDBDBD"}
            icon={isPlaying ? <Stop /> : <PlayArrow/>}
            onTouchTap={() => this.handleClick(false)}
          />
          {isPlaying && <RaisedButton
            onTouchTap={() => this.handleClick(true)}
            icon={<Pause/>}
          />}
        </CardActions>
      </Card>
    );
  }

}
