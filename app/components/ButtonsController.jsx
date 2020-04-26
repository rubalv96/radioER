import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from "react-player";

export default class ButtonsController extends React.Component {

  constructor(){
    super();
  }

  render(){
    let buttons = (
      <>
        <div id="playButton" onClick={()=>{this.props.onPlay();}} />
        <div id="pauseButton" onClick={()=>{this.props.onPause();}} />
        <div id="nextButton" onClick={()=>{this.props.onNext();}} />
        <div id="prevButton" onClick={()=>{this.props.onPrev();}} />
        <div id="muteButton" onClick={()=>{this.props.onMute();}} />
        <div id="stopButton" onClick={()=>{this.props.onStop();}} />
      </>
    );

    let playLed = this.props.playingCassette ? "ledON" : "ledOFF";
    let stopLed = this.props.stopPlaying ? "ledON" : "ledOFF";
    let muteLed = this.props.muted ? "ledON" : "ledOFF";
    let pauseLed = (!this.props.playingCassette && this.props.isSomeCassetteSelected) ? "ledON" : "ledOFF";

    let leds = (
      <>
        <div id={"playLED"} className={playLed} />

        <div id={"stopLED"} className={stopLed} />

        <div id={"muteLED"} className={muteLed} />

        <div id={"pauseLED"} className={pauseLed} />

        <div id={"nextLED"} className={"nextLed"} />

        <div id={"prevLED"} className={"prevLed"} />
      </>
    );

    return (
      <>
        {buttons}
        {leds}
      </>
    );
  }

}