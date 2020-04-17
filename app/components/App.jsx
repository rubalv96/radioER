import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
let GLOBAL_CONFIG = require('../config/config.js');
console.log(GLOBAL_CONFIG);
import * as I18n from '../vendors/I18n.js';
import * as Utils from '../vendors/Utils';

import SCORM from './SCORM.jsx';
import Radio from './Radio';
import {updateTracks, addObjectives, changeFrequency} from '../reducers/actions';


export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
    };
    this.changeFrequency = this.changeFrequency.bind(this);
    this.getInitialTracks = this.getInitialTracks.bind(this);
  }


  componentDidMount(){
    this.startRadio();
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
    this.props.dispatch(addObjectives(objectives));



  }

  render(){
    let appContent = "";

    if((this.props.tracking.finished !== true) || (this.props.wait_for_user_profile !== true)){
      appContent = (
        <Radio
          conf= {GLOBAL_CONFIG}
          tracks={this.props.tracks}
          current_frequency = {this.props.current_frequency}
          onFrequencyChange={this.changeFrequency}
          dispatch={this.props.dispatch}
        />
      );
    }

    return (
      <React.Fragment>
        <div id="container">
          {appContent}
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        </div>
      </React.Fragment>
    );
  }




  startRadio(){
    let tracks = this.getInitialTracks();
    this.props.dispatch(updateTracks(tracks));
  }

  getInitialTracks(){
    let tracks = Object.assign([], this.props.tracks);

    // Load the noise sound
    tracks.push(
      {
        "id":0,
        "path":"./assets/sounds/whiteNoise.mp3",
        "frequency":0,
        "volume":1,
      }
    );

    for(let i = 1; i < 50; i++){
      // Load the initial State with the tracks defined in the Config file
      if(typeof (GLOBAL_CONFIG["path_track_" + i]) === "string"){
        tracks.push(
          {
            "id":i,
            "path":GLOBAL_CONFIG["path_track_" + i],
            "frequency":GLOBAL_CONFIG["frequency_track_" + i],
            "volume":0,
            "completed": false,
            "required": true,
          }
        );
      }
      // Load the initial State with the morse sounds defined in the Config file
      if(typeof (GLOBAL_CONFIG["plain_text_to_morse_" + i]) === "string"){
        tracks.push(
          {
            "id":i+1000,
            "path":"./assets/sounds/morse/morse_sound_from_plain_text_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_plain_text_" + i],
            "volume":0,
            "completed": false,
            "required": true,

          }
        );
      }
      if(typeof (GLOBAL_CONFIG["coded_text_to_morse_" + i]) === "string"){
        tracks.push(
          {
            "id":i+2000,
            "path":"./assets/sounds/morse/morse_sound_from_coded_text_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_coded_text_" + i],
            "volume":0,
            "completed": false,
            "required": true,

          }
        );
      }

      if(typeof (GLOBAL_CONFIG["path_fake_track_" + i]) === "string"){
        tracks.push(
          {
            "id":i+3000,
            "path":GLOBAL_CONFIG["path_fake_track_" + i],
            "frequency":GLOBAL_CONFIG["frequency_fake_track_" + i],
            "volume":0,
            "completed": false,
            "required": false,

          }
        );
      }

      if(typeof (GLOBAL_CONFIG["plain_text_to_morse_fake_" + i]) === "string"){
        tracks.push(
          {
            "id":i+4000,
            "path":"./assets/sounds/morse/morse_sound_from_plain_text_fake_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_plain_text_fake_" + i],
            "volume":0,
            "completed": false,
            "required": false,

          }
        );
      }
      if(typeof (GLOBAL_CONFIG["coded_text_to_morse_fake_" + i]) === "string"){
        tracks.push(
          {
            "id":i+5000,
            "path":"./assets/sounds/morse/morse_sound_from_coded_text_fake_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_coded_text_fake_" + i],
            "volume":0,
            "completed": false,
            "required": false,

          }
        );
      }

    console.log("TRACKS: "+ JSON.stringify(tracks));

    }
    return tracks;
  }
  changeFrequency(freq){
    let tracks = Object.assign([], this.props.tracks);
    let new_tracks = tracks.map((track, index)=>{

      if(this.isNoiseSound(track)){
        track.volume = this.setNoiseVolume(tracks);
      }
      else if(this.isCloseToFrequency(freq, track.frequency, GLOBAL_CONFIG.delta)){
        track.volume = this.setVolume(this.distanceToFrequency(freq, track.frequency), GLOBAL_CONFIG.delta);
      }
      else{
        track.volume = 0;
      }
      return track;
    });

    this.props.dispatch(updateTracks(new_tracks));
    this.props.dispatch(changeFrequency(freq));
  }

  isNoiseSound(track){
    return (track.id === 0);
  }

  setNoiseVolume(tracks){
    let max_volume = 0;
    tracks.forEach(track => {
      if(track.volume> max_volume){
        max_volume =track.volume;
      }
    });

    let noise_volume= 1 - max_volume;
    return noise_volume;
  }

  isCloseToFrequency(current_frequency, track_frequency, delta){
    let isClose = (current_frequency <= (track_frequency + delta) && (current_frequency >= (track_frequency - delta)));

    return isClose;
  }

  distanceToFrequency(current_frequency, track_frequency){

    return Math.abs(current_frequency - track_frequency);
  }

  setVolume(distance, delta){
    let normalized_distance, volume;
    delta === 0 ? normalized_distance = 0 : normalized_distance = distance / delta;
    volume = (1 - normalized_distance);
    return volume;
  }
}


function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(App);