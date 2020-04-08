import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from "react-player";

export default class Track extends React.Component {

  constructor(){
    super();
  }
  render(){
    let track;
    if(this.props.isNoise){
      console.log("Noise sound");
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
      console.log("Track sound");
      track=(
        <ReactPlayer
          style={{display:"none"}}
          url={this.props.path}
          volume = {this.props.volume}
          playing = {this.props.playingMusic}
          loop
        />
      );
    }

    return (
      <div>
        {track}
       </div> 

    );
  }

}