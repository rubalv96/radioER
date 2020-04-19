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
    if (this.props.cassetteTracks !== undefined && !this.props.stopPlaying && this.props.isSelected){
      console.log("Album " + this.props.albumTitle);
      console.log("Tracks totales: " + this.props.cassetteTracks.tracks);
      console.log("Reproduciendo track " + this.props.cassetteTracks.tracks[this.props.trackNumber].path);
      player=(
        <ReactPlayer
            style={{display: "none"}}
            url={this.props.cassetteTracks.tracks[this.props.trackNumber].path}
            playing={this.props.playingCassette}
            volume={1}
            muted = {this.props.muted}
            onEnded = {()=>{this.props.onEnded(this.props.id, this.props.trackNumber)}}
        />
      )
    }



    return (
      <>
        <div className="cassette" onClick={()=>{this.props.onSelectCassette(this.props.id)}}>
            <p className="albumTitle">
                {this.props.albumTitle}
            </p>
            {/*<p className="artistName">*/}
            {/*    {this.props.artistName}*/}
            {/*</p>*/}
        </div>
        {player}





        </>
    );
  }

}