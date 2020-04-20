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
import {
  updateTracks,
  addObjectives,
  changeFrequency,
  updateCassetteTracks,
  trackCompleted,
  cassetteTrackCompleted,
  cassetteTracksCompleted,
  radioTracksCompleted, objectiveAccomplished,
} from '../reducers/actions';
import AlertMessages from "./AlertMessages";

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
      id_cassette_selected:-1,
      show_success_message: false,
      show_error_message:false,
      show_info_message:false,
    };
    this.changeFrequency = this.changeFrequency.bind(this);
    this.getInitialTracks = this.getInitialTracks.bind(this);
    this.onSelectCassette = this.onSelectCassette.bind(this);
    this.loadCassettes = this.loadCassettes.bind(this);
    this.checkCassetteTrackCompleted = this.checkCassetteTrackCompleted.bind(this);
    this.checkAllCassetteTracksCompleted = this.checkAllCassetteTracksCompleted.bind(this);
    this.checkChallengeAccomplished = this.checkChallengeAccomplished.bind(this);
    this.checkRadioTrackCompleted = this.checkRadioTrackCompleted.bind(this);
    this.checkAllRadioTracksCompleted = this.checkAllRadioTracksCompleted.bind(this);
  }

  componentDidMount(){
    this.startRadio();
    this.loadCassettes();
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
    this.props.dispatch(addObjectives(objectives));

  }

  render(){
    let appContent = "";

    if((this.props.tracking.finished !== true) || (this.props.wait_for_user_profile !== true)){
      appContent = (
        <>
        <Radio
          conf={GLOBAL_CONFIG}
          radioTracks={this.props.radioTracks}
          cassetteTracks={this.props.cassetteTracks}
          current_frequency={this.props.current_frequency}
          onSelectCassette={this.onSelectCassette}
          idCassetteSelected={this.state.id_cassette_selected}
          onFrequencyChange={this.changeFrequency}
          dispatch={this.props.dispatch}
          checkRadioTrackCompleted = {this.checkRadioTrackCompleted}
          checkAllRadioTracksCompleted={this.checkAllRadioTracksCompleted}
          checkCassetteTrackCompleted = {this.checkCassetteTrackCompleted}
          checkAllCassetteTracksCompleted = {this.checkAllCassetteTracksCompleted}
        />

        <AlertMessages
            openError = {this.state.show_error_message}
            openSuccess = {this.state.show_success_message}
            openInfo = {this.state.show_info_message}
        />





        </>
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
    this.props.dispatch(changeFrequency(GLOBAL_CONFIG.initial_frequency));
  }

  getInitialTracks(){
    let radioTracks = Object.assign([], this.props.radioTracks);

    // Load the noise sound
    radioTracks.push(
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
        radioTracks.push(
          {
            "id":i,
            "path":GLOBAL_CONFIG["path_track_" + i],
            "frequency":GLOBAL_CONFIG["frequency_track_" + i],
            "volume":0,
            "completed":false,
            "required":true,
          }
        );
      }
      // Load the initial State with the morse sounds defined in the Config file
      if(typeof (GLOBAL_CONFIG["plain_text_to_morse_" + i]) === "string"){
        radioTracks.push(
          {
            "id":i + 1000,
            "path":"./assets/sounds/morse/morse_sound_from_plain_text_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_plain_text_" + i],
            "volume":0,
            "completed":false,
            "required":true,

          }
        );
      }
      if(typeof (GLOBAL_CONFIG["coded_text_to_morse_" + i]) === "string"){
        radioTracks.push(
          {
            "id":i + 2000,
            "path":"./assets/sounds/morse/morse_sound_from_coded_text_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_coded_text_" + i],
            "volume":0,
            "completed":false,
            "required":true,

          }
        );
      }

      if(typeof (GLOBAL_CONFIG["path_fake_track_" + i]) === "string"){
        radioTracks.push(
          {
            "id":i + 3000,
            "path":GLOBAL_CONFIG["path_fake_track_" + i],
            "frequency":GLOBAL_CONFIG["frequency_fake_track_" + i],
            "volume":0,
            "completed":false,
            "required":false,

          }
        );
      }

      if(typeof (GLOBAL_CONFIG["plain_text_to_morse_fake_" + i]) === "string"){
        radioTracks.push(
          {
            "id":i + 4000,
            "path":"./assets/sounds/morse/morse_sound_from_plain_text_fake_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_plain_text_fake_" + i],
            "volume":0,
            "completed":false,
            "required":false,

          }
        );
      }
      if(typeof (GLOBAL_CONFIG["coded_text_to_morse_fake_" + i]) === "string"){
        radioTracks.push(
          {
            "id":i + 5000,
            "path":"./assets/sounds/morse/morse_sound_from_coded_text_fake_" + i + ".mp3",
            "frequency":GLOBAL_CONFIG["frequency_coded_text_fake_" + i],
            "volume":0,
            "completed":false,
            "required":false,

          }
        );
      }


    }
    return radioTracks;
  }

  changeFrequency(freq){
    let tracks = Object.assign([], this.props.radioTracks);
    let new_tracks = tracks.map((track, index) => {

      if(this.isNoiseSound(track)){
        track.volume = this.setNoiseVolume(tracks);
      } else if(this.isCloseToFrequency(freq, track.frequency, GLOBAL_CONFIG.delta)){
        track.volume = this.setVolume(this.distanceToFrequency(freq, track.frequency), GLOBAL_CONFIG.delta);
      } else{
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
      if(track.volume > max_volume){
        max_volume = track.volume;
      }
    });

    let noise_volume = 1 - max_volume;
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

  loadCassettes(){
    let cassetteTracks = Object.assign([], this.props.cassetteTracks);
    for(let i = 1; i < 20; i++){
      if(typeof (GLOBAL_CONFIG["cassette_" + i]) === "object"){
        let cassette = Object.assign({}, GLOBAL_CONFIG["cassette_" + i]);

        cassetteTracks.push(
          {
            "id":i,
            "title":cassette.title,
            "titleFont": this.getRandomFont(),
            "artist":cassette.artist,
            "color": this.getRandomColor(),
            "tracks":cassette.tracks,
          }
        );

      }
    }

    //Push the completed field in each track
    for(let i=0; i<cassetteTracks.length; i++){
      for(let j=0; j<cassetteTracks[i].tracks.length; j++){
        cassetteTracks[i].tracks[j].completed=false;
      }
    }
    this.props.dispatch(updateCassetteTracks(cassetteTracks));
  }

  onSelectCassette(idCassette){
    this.setState({id_cassette_selected:idCassette});
  }


checkRadioTrackCompleted(listening_music_time, duration_music_time, trackId, isRequired){
  if(listening_music_time > duration_music_time){
    console.log("Track " + trackId + " completed.");
    this.props.dispatch(trackCompleted(trackId));
    if(isRequired){
      this.checkAllRadioTracksCompleted();
    }
    else if(GLOBAL_CONFIG.strict_mode){
      console.log("Has escuchado un audio que no deberías. No puedes seguir jugando");
      this.setState({show_error_message: true});
    }
    else{
      console.log("Has escuchado un audio que no deberías. Pero PUEDES seguir jugando");
      this.setState({show_info_message: true});
    }
  }
}

checkAllRadioTracksCompleted(){
    let tracks = Object.assign([], this.props.radioTracks);
  let flag_completed = true;
  for (let i=0; i<tracks.length;i++){
    if(tracks[i].required && !tracks[i].completed){
      flag_completed = false;
    }
  }
  if(flag_completed){
    this.props.dispatch(radioTracksCompleted());

    console.log("All radio tracks completed.");
  }
}



  checkCassetteTrackCompleted(idCassette, trackNumber){
      this.props.dispatch(cassetteTrackCompleted(idCassette, trackNumber));
      if(this.props.cassetteTracks[idCassette-1].tracks[trackNumber].required){
        console.log("Correct track.");
        this.checkAllCassetteTracksCompleted();
      }
      else if(GLOBAL_CONFIG.strict_mode){
        console.log("You fail. You cannot continue playing.");
      }
      else{
        console.log("YOu fail but you can continue playing.");
      }
    }

    checkAllCassetteTracksCompleted(){
      let cassettes = this.props.cassetteTracks;
      let flag_completed = true;
      for (let i=0; i<cassettes.length;i++){
        for(let j=0; j<cassettes[i].tracks.length; j++){
          if(cassettes[i].tracks[j].required && !cassettes[i].tracks[j].completed){
            flag_completed = false;
          }
        }

      }
      if(flag_completed){
        this.props.dispatch(cassetteTracksCompleted());
        console.log("All cassette tracks completed.");
        this.checkChallengeAccomplished();
      }
    }
  checkChallengeAccomplished(){
    if(this.props.cassetteTracksCompleted && this.props.radioTracksCompleted){
      this.props.dispatch(objectiveAccomplished(1,1));
      console.log("SCORM: Objective Accomplished");
      this.setState({show_success_message: true});

    }
}
  getRandomColor() {
    return "hsl(" + 360 * Math.random() + ',' +
      (25 + 70 * Math.random()) + '%,' +
      (85 + 10 * Math.random()) + '%)'
  }
  getRandomFont(){
    let fonts = [
      "baloo-bhaina",
      "josefin-slab",
      "arvo",
      "lato",
      "volkhov",
      "abril-fatface",
      "ubuntu",
      "roboto",
      "droid-sans-mono",
      "anton",
    ];
    return fonts[Math.floor(Math.random()*(fonts.length-1))];
  }





}
function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(App);