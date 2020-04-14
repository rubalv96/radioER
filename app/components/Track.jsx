import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {trackCompleted} from '../reducers/actions';
import ReactPlayer from "react-player";

export default class Track extends React.Component {

  constructor(){
    super();
    this.state = {
      listening_music_time:0,
      duration_music_time: 0,
    };
    this.updateListeningTime = this.updateListeningTime.bind(this);
  }

  componentDidMount(){
    setInterval(this.updateListeningTime, 1000);
  }

  updateListeningTime(){
    if(!this.props.isCompleted && !this.props.isNoise && this.props.volume>0.5 && this.props.playingMusic){
      let time = this.state.listening_music_time;
      let new_time = time + 1;
      this.setState({listening_music_time:new_time});
      this.checkTrackCompleted();
    }
    else{
      this.setState({listening_music_time: 0});
    }
   
  }

  checkTrackCompleted(){
    if(this.state.listening_music_time > this.state.duration_music_time){
      this.props.dispatch(trackCompleted(this.props.id));
      this.props.checkAllTracksCompleted();
    }

  }

  


  render(){
    let track;
    if(this.props.isNoise){
      // console.log("Noise sound");
      track=(
        <ReactPlayer
          style={{display:"none"}}
          url={"../assets/sounds/whiteNoise.mp3"}
          volume = {this.props.volume}
          playing = {this.props.playingMusic}
          loop
        />
      );
    }
    else{
      // console.log("Track sound");
      track=(
        <ReactPlayer
          style={{display:"none"}}
          url={this.props.path}
          volume = {this.props.volume}
          playing = {this.props.playingMusic}
          loop
          onDuration={(duration)=>{this.setState({duration_music_time: duration})}}
        />
      );
    }

    return (
      <div style={{display:"none"}}>
        {track}
       </div> 

    );
  }

}