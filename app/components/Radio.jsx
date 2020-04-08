import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@material-ui/core/Slider';
import TrackList from './TrackList';
import {changeFrequency} from '../reducers/actions';
import RadioImage from './RadioImage.jsx';

export default class Radio extends React.Component {

  constructor(){
    super();
    this.state = {
      playing_music:false,
    };

    this.set_playing_music = this.set_playing_music.bind(this);

  }

  set_playing_music(){
    this.setState({playing_music: true});
  }

  render(){
      console.log("Tracks en Radio.jsx: " + JSON.stringify(this.props.tracks));
    return (
      <>
        <div style={{width:"100vw", height:"100vh", textAlign:"center", position:"relative"}}>

          {/* <img style={{maxWidth:"100%", maxHeight:"100%"}}src="./assets/images/radio.png"/> */}

          <Slider
            style={{color:"black",position:"absolute", top:"24%", left:"33vw", width:"30%", zIndex:"1"}}

            defaultValue={this.props.conf.initial_frequency}
            max={this.props.conf.max_frequency}
            min={this.props.conf.min_frequency}
            step={this.props.conf.step_frequency}

            onChange={(ev, freq)=>{this.props.dispatch(changeFrequency(freq));}}
            // onChangeCommitted={(ev, freq)=>{this.props.dispatch(changeFrequency(freq));}}
            // marks={marks}
            valueLabelDisplay="on"

          />

          <RadioImage 
          playingMusicFunction = {this.set_playing_music}
          />

          <TrackList
            trackList={this.props.tracks}
            conf={this.props.conf}
            playingMusic = {this.state.playing_music}
          />

        

        </div>

      </>
    );
  }

}