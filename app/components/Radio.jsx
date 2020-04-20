import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@material-ui/core/Slider';
import TrackList from './TrackList';
import RadioImage from './RadioImage.jsx';
import BackgroundImage from './backgroundImage';
import Instructions from "./Instructions";

export default class Radio extends React.Component {

  constructor(){
    super();
    this.state = {
      playing_music:false,
      global_volume:0.5,
    };

    this.set_playing_music = this.set_playing_music.bind(this);
    this.set_global_volume = this.set_global_volume.bind(this);

  }

  set_playing_music(){
    if(this.state.playing_music){
      this.setState({playing_music:false});
    }
    else{
      this.setState({playing_music:true});
    }
  }

  set_global_volume(global_volume){
    this.setState({"global_volume": global_volume})
  }

  render(){
    return (
      <>
        <div>
        <BackgroundImage
                imagePath="../assets/images/background.jpg"
          />
          <RadioImage
            playingMusicFunction = {this.set_playing_music}
            playingMusicValue = {this.state.playing_music}
            globalVolumeFunction={this.set_global_volume}
            globalVolume = {this.state.global_volume}
            onFrequencyChange = {this.props.onFrequencyChange}
            conf = {this.props.conf}
            current_frequency = {this.props.current_frequency}
            cassetteTracks = {this.props.cassetteTracks}
            onSelectCassette={this.props.onSelectCassette}
            idCassetteSelected = {this.props.idCassetteSelected}
            checkCassetteTrackCompleted = {this.props.checkCassetteTrackCompleted}
            checkAllCassetteTracksCompleted = {this.props.checkAllCassetteTracksCompleted}
          />

          <TrackList
            trackList={this.props.radioTracks}
            conf={this.props.conf}
            playingMusic = {this.state.playing_music}
            dispatch = {this.props.dispatch}
            globalVolume = {this.state.global_volume}
            checkRadioTrackCompleted = {this.props.checkRadioTrackCompleted}
            checkAllRadioTracksCompleted={this.props.checkAllRadioTracksCompleted}
          />

          <Instructions/>



        </div>

      </>
    );
  }

}