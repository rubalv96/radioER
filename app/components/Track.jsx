import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {trackCompleted} from '../reducers/actions';
import ReactPlayer from "react-player";
let GLOBAL_CONFIG = require('../config/config.js');

export default class Track extends React.Component {

  constructor(){
    super();
    this.state = {
      listening_music_time:0,
      duration_music_time:0,
    };
    this.updateListeningTime = this.updateListeningTime.bind(this);
  }

  componentDidMount(){

    setInterval(this.updateListeningTime, 1000);
  }

  updateListeningTime(){
    if(this.props.type === "radio"){
      if(!this.props.isCompleted && !this.props.isNoise && this.props.trackVolume > 0 && this.props.playingMusic){
        let time = this.state.listening_music_time;
        let new_time = time + 1;
        this.setState({listening_music_time:new_time});
        this.checkTrackCompleted();
      }
      else {
        this.setState({listening_music_time:0});
      }
    }
    if(this.props.type === "cassette"){
      if(!this.props.isCompleted && this.props.playingMusic){
        console.log("ID: " + this.props.idCassette);
        console.log("TRACK NUMBER: " + this.props.trackNumber);
        let time = this.state.listening_music_time;
        let new_time = time + 1;
        this.setState({listening_music_time:new_time});
        this.props.checkCassetteTrackCompleted(this.state.listening_music_time, this.state.duration_music_time, this.props.idCassette + 1, this.props.trackNumber);
      }
    }

  }

  checkTrackCompleted(){

    this.props.checkRadioTrackCompleted(this.state.listening_music_time, this.state.duration_music_time, this.props.id, this.props.isRequired);

  }

  render(){
    let track = "";
    if(this.props.type === "radio"){
      if(this.props.isNoise){
        // console.log("Noise sound");
        track = (
          <ReactPlayer
            style={{display:"none"}}
            url={"./assets/sounds/whiteNoise.mp3"}
            volume = {this.props.globalVolume}
            playing = {this.props.playingMusic}
            loop
          />
        );
      }
      else {
        // console.log("Track sound");
        track = (
          <ReactPlayer
            style={{display:"none"}}
            url={this.props.path}
            volume = {this.props.globalVolume}
            playing = {this.props.playingMusic}
            loop
            onDuration={(duration)=>{this.setState({duration_music_time:duration});}}
          />
        );
      }
    }

    if(this.props.type === "cassette"){
      track = <ReactPlayer
        style={{display:"none"}}
        url={this.props.path}
        volume = {this.props.globalVolume}
        playing = {this.props.playingMusic}
        onDuration={(duration)=>{this.setState({duration_music_time:duration});}}
        onEnded = {this.props.onEnded}
        muted = {this.props.muted}

      />;
    }

    return (
      <div style={{display:"none"}}>
        {track}
      </div>

    );
  }

}