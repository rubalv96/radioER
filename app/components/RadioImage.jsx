import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@material-ui/core/Slider';
import WheelSlider from './WheelSlider';
import FrequencyDisplay from './FrequencyDisplay';
import {changeFrequency} from '../reducers/actions';
import AudioCassettes from './AudioCassettes';
import ButtonsController from "./ButtonsController";
import Radio from "./Radio";

export default class RadioImage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      playing_cassette:false,
      track_number:0,
      stop_playing: false,
      muted: false,
    };
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onMute = this.onMute.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.resetTrackNumber = this.resetTrackNumber.bind(this);

  }

  handleFrequencyChange(freq){
    this.props.onFrequencyChange(freq);
  }
  createMarks(){
    let fmin = this.props.conf.min_frequency;
    let fmax = this.props.conf.max_frequency;
    let marks = [];
    let f = fmin;
    while(f <= fmax){
      if(f % 5 === 0){
        marks.push({
          value:f,
          label:f.toString() + " Mhz",
        });
      }

      f++;
    }
    return marks;
  }

  render(){

    let color;
    this.props.playingMusicValue ? color = "buttonOn" : color = "buttonOff";
    const marks = [];
    let cassetteTrackTitle = this.props.cassetteTracks[0] !== undefined && this.props.idCassetteSelected!==-1 ? this.props.cassetteTracks[this.props.idCassetteSelected].tracks[this.state.track_number].title : "";
    let cassetteTitle = this.props.cassetteTracks[0] !== undefined && this.props.idCassetteSelected!==-1  ? this.props.cassetteTracks[this.props.idCassetteSelected].title : "";
    let trackNumber = this.state.track_number + 1;
    let tracksDisplay ="";
    this.props.idCassetteSelected !== -1? tracksDisplay=(
      <><b>Track {trackNumber}</b>. {cassetteTrackTitle}</>
  ) : tracksDisplay="Insert Cassette";
    return (
      <>

        <div id="radioContainer">
          <img id="radioImg" src="./assets/images/radio.png"/>
          <button id="btnOnOff" onClick={()=>{this.props.playingMusicFunction();}}/>
          <Slider
            id="frequencySlider"
            className={this.props.playingMusicValue ? "radioOn" : "radioOff"}
            value={this.props.current_frequency}
            defaultValue={this.props.conf.initial_frequency}
            max={this.props.conf.max_frequency}
            min={this.props.conf.min_frequency}
            step={this.props.conf.step_frequency}

            onChange={(ev, freq)=>{this.props.onFrequencyChange(freq);}}
            valueLabelDisplay="off"
            marks={this.createMarks()}

          />

          <WheelSlider
            minValue = {this.props.conf.min_frequency}
            maxValue = {this.props.conf.max_frequency}
            initialValue={this.props.current_frequency}
            step = {this.props.conf.step_frequency}
            conf = {this.props.conf}
            onChange = {this.handleFrequencyChange}
          />

          {/*<div id="volumeRoundSlider">*/}
          {/*  <WheelSlider*/}
          {/*    type= "frequencyRoundSlide"*/}
          {/*    minValue = {0}*/}
          {/*    maxValue = {1}*/}
          {/*    initialValue={0.5}*/}
          {/*    step = {0.05}*/}
          {/*    conf = {this.props.conf}*/}
          {/*    dispatch = {this.props.dispatch}*/}
          {/*    onChange= {(volume)=>{this.props.globalVolumeFunction(volume);}}*/}

          {/*  />*/}
          {/*</div>*/}

          <Slider
            id="volumeVerticalSlider"
            orientation={"vertical"}
            defaultValue={0.5}
            max={1}
            min={0}
            step={0.1}
            onChange= {(ev,volume)=>{this.props.globalVolumeFunction(volume);}}
            // onChange= {(volume)=>{console.log("VOLU;E:"+ volume.toString());}}
            marks

          />d
          <div id="lightOnOff" className={color} />

          <FrequencyDisplay
            isActive={this.props.playingMusicValue}
            current_frequency = {this.props.current_frequency}
          />

          <AudioCassettes
            onSelectCassette={this.props.onSelectCassette}
            cassetteTracks = {this.props.cassetteTracks}
            playingCassette = {this.state.playing_cassette}
            trackNumber = {this.state.track_number}
            stopPlaying = {this.state.stop_playing}
            muted = {this.state.muted}
            onEnded = {this.onEnded}
            idCassetteSelected = {this.props.idCassetteSelected}
            globalVolume = {this.props.globalVolume}
            resetTrackNumber={this.resetTrackNumber}


          />

          <ButtonsController
            onPlay={this.onPlay}
            onPause={this.onPause}
            onNext={this.onNext}
            onPrev={this.onPrev}
            onStop={this.onStop}
            onMute={this.onMute}
            playingCassette={this.state.playing_cassette}
            stopPlaying = {this.state.stop_playing}
            muted = {this.state.muted}
            isSomeCassetteSelected = {this.props.idCassetteSelected !== -1}
          />

          <div id={"titleCassetteScreen"}>
            {tracksDisplay}
          </div>
          <div id={"titleCassette"}>
            <b>{cassetteTitle}</b>
          </div>
        </div>

      </>
    );

    }

  onPlay(){
    this.setState({playing_cassette: true});
    this.setState({stop_playing: false});
  }

  onPause(){
    this.setState({playing_cassette: false});
  }

  onNext(){
    let trackNumber = this.state.track_number;
    console.log("Longitud de tracks (debe ser 2): ");
    console.log( this.props.cassetteTracks[0].tracks.length);

    if(trackNumber === this.props.cassetteTracks[this.props.idCassetteSelected].tracks.length-1){
      this.setState({track_number: 0});
    }
    else{
      this.setState({track_number: trackNumber+1});
    }
    console.log("Next. Track " + this.state.track_number);
  }
  onPrev(){
    let trackNumber = this.state.track_number;
    let lastTrack = this.props.cassetteTracks[this.props.idCassetteSelected].tracks.length - 1;
    console.log("Last track: " + lastTrack);
    if(trackNumber === 0){
      trackNumber = lastTrack;
    }
    else{
      trackNumber = trackNumber -1;
    }
    this.setState({track_number: trackNumber});
    console.log("PREV. Track" + this.state.track_number);
  }

  onMute(){
    let isMuted = this.state.muted;
    this.setState({muted: !isMuted});

  }

  onStop(){
    let trackNumber = 0;
    this.setState({track_number: trackNumber});
    this.setState({playing_cassette: false});
    this.setState({stop_playing: true});
    console.log("STOP. Track " + this.state.track_number);
  }

  onEnded(idCassette, trackNumber){

    // Pasar a completado el track
    // Comprobar que era requerido
    // Comprobar si esta escuhados todos los tracks
    this.setState({playing_cassette: false});
    this.setState({stop_playing: true});
    this.props.checkCassetteTrackCompleted(idCassette, trackNumber);
    this.props.checkAllCassetteTracksCompleted();

  }

  resetTrackNumber(){
    this.setState({track_number: 0});
  }

}