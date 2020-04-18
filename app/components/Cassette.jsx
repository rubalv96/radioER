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
    if (this.props.cassetteTracks[0] !== undefined){
      console.log(this.props.cassetteTracks[0].id);
      console.log(this.props.cassetteTracks[0].tracks[0].path);
      player=(
        <ReactPlayer
            style={{display: "none"}}
            url={this.props.cassetteTracks[0].tracks[this.props.trackNumber].path}
            playing={this.props.playingCassette}
            volume={1}
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