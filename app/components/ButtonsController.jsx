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
        <div id="playButton" onClick={()=>{this.props.onPlay()}}>
        </div>
        <div id="pauseButton" onClick={()=>{this.props.onPause()}}>
        </div>
        <div id="nextButton" onClick={()=>{this.props.onNext()}}>
        </div>
        <div id="prevButton" onClick={()=>{this.props.onPrev()}}>
        </div>
        <div id="muteButton" onClick={()=>{this.props.onMute()}}>
        </div>
        <div id="stopButton" onClick={()=>{this.props.onStop()}}>
        </div>
      </>
    );

    let playLed = this.props.playingCassette ? "ledON" : "ledOFF";
    let stopLed = this.props.stopPlaying ? "ledON" : "ledOFF";
    let muteLed = this.props.muted ? "ledON" : "ledOFF";
    let pauseLed = (!this.props.playingCassette && !this.props.stopPlaying)  ? "ledON" : "ledOFF";


    let leds=(
      <>
      <div id={"playLED"} className={playLed}>
      </div>

      <div id={"stopLED"} className={stopLed}>
      </div>

    <div id={"muteLED"} className={muteLed}>
    </div>

    <div id={"pauseLED"} className={pauseLed}>
      </div>

    <div id={"nextLED"} className={"nextLed"}>
    </div>

    <div id={"prevLED"} className={"prevLed"}>
      </div>
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