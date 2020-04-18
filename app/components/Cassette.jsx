import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from "react-player";

export default class Cassette extends React.Component {

  constructor(){
    super();
  }

  render(){

    let player="";
    if (this.props.cassetteTracks[0] !== undefined && !this.props.stopPlaying){
      console.log("Tracks " + this.props.cassetteTracks[0].tracks);
      console.log("Reproduciendo track " + this.props.trackNumber);
      player=(
        <ReactPlayer
            style={{display: "none"}}
            url={this.props.cassetteTracks[0].tracks[this.props.trackNumber].path}
            playing={this.props.playingCassette}
            volume={1}
            muted = {this.props.muted}
            onEnded = {()=>{this.props.onEnded()}}
        />
      )
    }



    return (
      <>
        <div className="cassette" onClick={()=>{this.props.onSelectCassette(this.props.albumTitle)}}>
            <p className="albumTitle">
                {this.props.albumTitle}
            </p>
            <p className="artistName">
                {this.props.artistName}
            </p>
        </div>
        {player}



        </>
    );
  }

}