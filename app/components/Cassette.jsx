import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from "react-player";
import Track from "./Track";
import AudioCassettes from "./AudioCassettes";

export default class Cassette extends React.Component {

  constructor(){
    super();
  }

  render(){

    let player = "";
    if(this.props.cassetteTracks !== undefined && !this.props.stopPlaying && this.props.isSelected){

      console.log("ID" + this.props.cassetteTracks.id);
      console.log("TRACK NUMBER" + this.props.trackNumber);

      player = (
        <Track
          type={"cassette"}
          idCassette={this.props.cassetteTracks.id}
          trackNumber = {this.props.trackNumber}
          isCompleted = {this.props.cassetteTracks.tracks[this.props.trackNumber].completed}
          path={this.props.cassetteTracks.tracks[this.props.trackNumber].path}
          trackVolume = {1}
          globalVolume={this.props.globalVolume}
          playingMusic = {this.props.playingCassette}
          muted = {this.props.muted}
          checkCassetteTrackCompleted = {this.props.checkCassetteTrackCompleted}
          checkAllCassetteTracksCompleted = {this.props.checkAllCassetteTracksCompleted}
          onEnded = {()=>{this.props.onEnded();}}
        />
        // <ReactPlayer
        //     style={{display: "none"}}
        //     url={this.props.cassetteTracks.tracks[this.props.trackNumber].path}
        //     playing={this.props.playingCassette}
        //     volume={this.props.globalVolume}
        //     muted = {this.props.muted}
        //     onEnded = {()=>{this.props.onEnded(this.props.id, this.props.trackNumber)}}
        // />
      );
    }

    return (
      <>
        <div className="cassette" style={{backgroundColor:this.props.cassetteTracks.color}} onClick={()=>{this.props.onSelectCassette(this.props.id); this.props.resetTrackNumber();}}>
          <p id="albumTitle" className={this.props.cassetteTracks.titleFont}>
            {this.props.albumTitle}
          </p>
          {/* <p className="artistName">*/}
          {/*    {this.props.artistName}*/}
          {/* </p>*/}
        </div>
        {player}

      </>
    );

  }

}