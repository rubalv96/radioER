import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import {objectiveAccomplished} from '../reducers/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Track from './Track';
import {changeFrequency} from '../reducers/actions';

export default class TrackList extends React.Component {

  constructor(){
    super();

    this.checkAllTracksCompleted = this.checkAllTracksCompleted.bind(this);
  }

  checkAllTracksCompleted(){
    let tracks = this.props.trackList;
    let completed_flag = true;
    tracks.map((track,index)=>{
      if(track.id===0){
        return;
      }
      else if(track.completed === false){
        completed_flag = false;
      }
      return;
    });
    if(completed_flag){
      this.props.dispatch(objectiveAccomplished(1, 1));
    }

  }
  render(){

    let trackList = (
      this.props.trackList.map((track, index)=>{
        return (
          <Track
            key={index}
            id={track.id}
            path={track.path}
            frequency = {track.frequency}
            volume = {track.volume * this.props.globalVolume}
            isCompleted = {track.completed}
            checkAllTracksCompleted = {this.checkAllTracksCompleted}
            playingMusic = {this.props.playingMusic}
            isNoise = {track.id === 0}
            dispatch = {this.props.dispatch}
          />
        );

      })
    );
    return (
      <div style={{display:"none"}}>
        {trackList}

      </div>
    );
  }

}