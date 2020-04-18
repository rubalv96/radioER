import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from "react-player";

export default class ButtonsController extends React.Component {

  constructor(){
    super();
  }

  render(){





    return (
      <>
        <div id="playButton" onClick={()=>{this.props.onPlay()}}>
        </div>
        <div id="pauseButton" onClick={()=>{this.props.onPause()}}>
        </div>


      </>
    );
  }

}