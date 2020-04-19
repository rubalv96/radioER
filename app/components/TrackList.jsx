import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import {objectiveAccomplished, radioTracksCompleted} from '../reducers/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Track from './Track';


export default class TrackList extends React.Component {

  constructor(){
    super();

    this.checkAllTracksCompleted = this.checkAllTracksCompleted.bind(this);
  }

  checkAllTracksCompleted(){
    this.props.checkAllRadioTracksCompleted(tracks);

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
            trackVolume = {track.volume }
            globalVolume={track.volume* this.props.globalVolume}
            isCompleted = {track.completed}
            isRequired = {track.required}
            checkAllTracksCompleted = {this.checkAllTracksCompleted}
            checkRadioTrackCompleted = {this.props.checkRadioTrackCompleted}
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