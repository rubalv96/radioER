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
import Header from "./Header";
let escapp;


export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.state = {
      id_cassette_selected:-1,
      show_success_message:false,
      show_error_message:false,
      show_info_message:false,

    };
    this.changeFrequency = this.changeFrequency.bind(this);
    this.getInitialTracks = this.getInitialTracks.bind(this);
    this.onSelectCassette = this.onSelectCassette.bind(this);
    this.loadCassettes = this.loadCassettes.bind(this);
    this.checkCassetteTrackCompleted = this.checkCassetteTrackCompleted.bind(this);
    this.checkRadioTracksAccomplished = this.checkRadioTracksAccomplished.bind(this);
    this.checkRadioTrackCompleted = this.checkRadioTrackCompleted.bind(this);
    this.defineObjectives = this.defineObjectives.bind(this);
    this.checkCassetteTracksAccomplished = this.checkCassetteTracksAccomplished.bind(this);
  }

  componentDidMount(){


    // Escapp configuration
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    // escapp.reset(); //Uncomment for removing local data storage
    escapp.validate(function(success, er_state){
      if(success){
        // this.restoreState(er_state);
      }
    }.bind(this));


    this.defineObjectives();

    this.startRadio();
    this.loadCassettes();

  }




  defineObjectives(){
    let objectives = [];
    // Number of radio tracks
    let nRadioTracksRequired=0;
    let nCassetteTracksRequired=0;

    if(typeof GLOBAL_CONFIG.radio_tracks === "object"){
      for(let i=0; i<GLOBAL_CONFIG.radio_tracks.length; i++){
        if (GLOBAL_CONFIG.radio_tracks[i].required !== 0){
          nRadioTracksRequired ++;
        }
      }
    }


    // Number of cassette tracks required
    if(typeof GLOBAL_CONFIG.cassettes === "object"){
      for(let i=0; i<GLOBAL_CONFIG.cassettes.length; i++){
        for(let j=0; j<GLOBAL_CONFIG.cassettes[i].tracks.length; j++){
          if (GLOBAL_CONFIG.cassettes[i].tracks[j].required !== 0){
            nCassetteTracksRequired ++;
          }
        }

      }
    }


    // Total of required tracks
    let nTracks = nRadioTracksRequired + nCassetteTracksRequired;
    // Radio tracks
    if(typeof GLOBAL_CONFIG.radio_tracks === "object"){
      for(let i = 0; i < GLOBAL_CONFIG.radio_tracks.length; i++){
        if(GLOBAL_CONFIG.radio_tracks[i].required !== 0){
          objectives.push(new Utils.Objective({
            id:("Radio" + (i + 1)),
            progress_measure:(1 / nTracks),
            score:(1 / nTracks)
          }));
        }
      }
    }
    if(typeof GLOBAL_CONFIG.cassettes === "object"){
      for(let i=0; i<GLOBAL_CONFIG.cassettes.length; i++){
        for(let j=0; j<GLOBAL_CONFIG.cassettes[i].tracks.length; j++){
          if (GLOBAL_CONFIG.cassettes[i].tracks[j].required !== 0){
            objectives.push(new Utils.Objective({id:("Cassette" + (i.toString()) + (j.toString()) ), progress_measure:(1 / nTracks), score:(1 / nTracks)}));
          }
        }

      }

    }



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

    if(typeof localStorage.getItem('frequency')!== "string"){
      this.props.dispatch(changeFrequency(GLOBAL_CONFIG.initial_frequency));
    }
    else{
      this.props.dispatch(changeFrequency(parseFloat(localStorage.getItem('frequency'))));
    }
  }

  getInitialTracks(){

    let radioTracks = Object.assign([], this.props.radioTracks);

    if(typeof(localStorage.getItem('radioTracks'))=== "string"){
      let tracks = localStorage.getItem('radioTracks');
      radioTracks = JSON.parse(tracks);
      this.checkRadioTracksAccomplished(radioTracks);
    }
    else{
      radioTracks.push(
        {
          "id":0,
          "path":"./assets/sounds/whiteNoise.mp3",
          "frequency":0,
          "volume":1,
        }
      );
      // Load the noise sound
      if(typeof GLOBAL_CONFIG.radio_tracks === "object"){



        let j = 1, k = 1;

        for(let i = 0; i < GLOBAL_CONFIG.radio_tracks.length; i++){
          // Load the initial State with the tracks defined in the Config file
          let type_of_track = GLOBAL_CONFIG.radio_tracks[i].type;
          if(type_of_track === "radio_track"){
            radioTracks.push(
              {
                "id":i + 1,
                "path":GLOBAL_CONFIG.radio_tracks[i].path,
                "frequency":GLOBAL_CONFIG.radio_tracks[i].frequency,
                "volume":0,
                "completed":false,
                "required":GLOBAL_CONFIG.radio_tracks[i].required,
              }
            );

          }

          if(type_of_track === "morse_plain_text"){
            radioTracks.push(
              {
                "id":i + 1,
                "path":"./assets/sounds/morse/morse_sound_from_plain_text_" + j + ".mp3",
                "frequency":GLOBAL_CONFIG.radio_tracks[i].frequency,
                "volume":0,
                "completed":false,
                "required":GLOBAL_CONFIG.radio_tracks[i].required,
              }
            );
            j++;
          }

          if(type_of_track === "morse_coded_text"){
            radioTracks.push(
              {
                "id":i + 1,
                "path":"./assets/sounds/morse/morse_sound_from_coded_text_" + k + ".mp3",
                "frequency":GLOBAL_CONFIG.radio_tracks[i].frequency,
                "volume":0,
                "completed":false,
                "required":GLOBAL_CONFIG.radio_tracks[i].required,
              }
            );
            k++;
          }

        }
      }
    }
    return radioTracks;
  }

  changeFrequency(freq){
    localStorage.setItem('frequency', freq.toString());
    let tracks = Object.assign([], this.props.radioTracks);
    let new_tracks = tracks.map((track, index) => {

      if(this.isNoiseSound(track)){
        track.volume = this.setNoiseVolume(tracks);
      } else if(this.isCloseToFrequency(freq, track.frequency, GLOBAL_CONFIG.delta)){
        track.volume = this.setVolume(this.distanceToFrequency(freq, track.frequency), GLOBAL_CONFIG.delta);
      } else {
        track.volume = 0;
      }
      return track;
    });

    localStorage.setItem('radioTracks', JSON.stringify(new_tracks));
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
    if(typeof GLOBAL_CONFIG.cassettes === "object"){
      let cassetteTracks = Object.assign([], this.props.cassetteTracks);

      if(typeof (localStorage.getItem('cassetteTracks')) === "string"){
        cassetteTracks = JSON.parse(localStorage.getItem('cassetteTracks'));
        this.checkCassetteTracksAccomplished(cassetteTracks);
      }
      else{
        for(let i = 0; i < GLOBAL_CONFIG.cassettes.length; i++){
          let cassette = Object.assign({}, GLOBAL_CONFIG.cassettes[i]);

          cassetteTracks.push(
            {
              "id":i,
              "title":cassette.title,
              "titleFont":this.getRandomFont(),
              "artist":cassette.artist,
              "color":this.getRandomColor(),
              "tracks":cassette.tracks,
            }
          );

        }

        // Push the completed field in each track
        for(let i = 0; i < cassetteTracks.length; i++){
          for(let j = 0; j < cassetteTracks[i].tracks.length; j++){
            cassetteTracks[i].tracks[j].completed = false;
          }
        }
      }


      this.props.dispatch(updateCassetteTracks(cassetteTracks));





    }

  }

  onSelectCassette(idCassette){
    this.setState({id_cassette_selected:idCassette});

  }

  checkRadioTrackCompleted(listening_music_time, duration_music_time, trackId, isRequired){
    let timeToComplete;
    if(this.props.radioTracks[trackId].required <= 1){
      timeToComplete = this.props.radioTracks[trackId].required * duration_music_time;
    }
    else {
      timeToComplete = this.props.radioTracks[trackId].required;
    }
    if(listening_music_time > timeToComplete){
      this.props.dispatch(trackCompleted(trackId));
      localStorage.setItem('radioTracks', JSON.stringify(this.props.radioTracks));
      this.props.dispatch(objectiveAccomplished("Radio" + trackId, 1));
      // Escapp Challenge achieved
      escapp.submitPuzzle(GLOBAL_CONFIG.radio_tracks[trackId-1].puzzleId, 0, {}, function(success, res){
      }.bind(this));



    }
  }





  checkCassetteTrackCompleted(listeningTime, duration, idCassette, trackNumber){
    let deltaError = 0.5;
    let timeToListen;
    if(this.props.cassetteTracks[idCassette - 1].tracks[trackNumber].required <= 1){
      timeToListen = duration * this.props.cassetteTracks[idCassette - 1].tracks[trackNumber].required;
    }
    else {
      timeToListen = this.props.cassetteTracks[idCassette - 1].tracks[trackNumber].required;
    }

    if(listeningTime > (timeToListen - deltaError)){
      console.log("Track escuchado: id ->" + (idCassette -1).toString() + "   trackNumber->" + trackNumber);

      this.props.dispatch(cassetteTrackCompleted(idCassette, trackNumber));
      this.props.dispatch(objectiveAccomplished("Cassette" + (idCassette-1).toString() + trackNumber.toString(), 1));
      escapp.submitPuzzle(GLOBAL_CONFIG.cassettes[idCassette-1].tracks[trackNumber].puzzleId, 0, {}, function(success, res){
      }.bind(this));

      localStorage.setItem('cassetteTracks', JSON.stringify(this.props.cassetteTracks));
      this.checkAllCassetteTracksCompleted();


    }

  }


  checkRadioTracksAccomplished(radioTracks){

    console.log("Length radioTracks: "+ radioTracks.length);
    for(let i=1; i<radioTracks.length; i++){
      if(radioTracks[i].completed &&radioTracks[i].required !== 0){
        this.props.dispatch(objectiveAccomplished("Radio" + i, 1));
      }
    }
  }

  checkCassetteTracksAccomplished(cassettes){
    console.log(cassettes);
    for(let i=0; i<cassettes.length; i++){
      for(let j=0; j<cassettes[i].tracks.length; j++){
        if(cassettes[i].tracks[j].required !== 0 && cassettes[i].tracks[j].completed){
          this.props.dispatch(objectiveAccomplished("Cassette" + i.toString() + j.toString() , 1));

        }
      }
    }
  }
  getRandomColor(){
    return "hsl(" + 360 * Math.random() + ',' +
      (25 + 70 * Math.random()) + '%,' +
      (85 + 10 * Math.random()) + '%)';
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
    return fonts[Math.floor(Math.random() * (fonts.length - 1))];
  }

}
function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(App);