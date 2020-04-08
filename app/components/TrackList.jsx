import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from "react-player";
import Track from './Track';

export default class TrackList extends React.Component {

  constructor(){
    super();
  }
  render(){
    console.log("Tracks en TrackList.jsx: " + JSON.stringify(this.props.trackList));
    
    let trackList = (
        this.props.trackList.map((track, index)=>{
                return (
                    <Track
                      key={index}
                      id={track.id}
                      path={track.path}
                      frequency = {track.frequency}
                      volume = {track.volume}
                      playingMusic = {this.props.playingMusic}
                      isNoise = {track.id===0}
                    />
                  );
            
            
          })
    );
    return (
        <div>
      {trackList}


        </div>
    );
  }

}