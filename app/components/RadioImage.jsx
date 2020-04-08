import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@material-ui/core/Slider';
import TrackList from './TrackList';
import {changeFrequency} from '../reducers/actions';

export default class RadioImage extends React.Component {

  constructor(){
    super();
    

  }

  render(){
    return (
      <>
        <div style={{width:"100vw", height:"100vh", textAlign:"center", position:"relative"}}>

          <img style={{maxWidth:"100%", maxHeight:"100%"}}src="./assets/images/radio.png"/>

          {/* <Slider
            style={{position:"absolute", top:"24%", left:"33vw", width:"30%"}}

            defaultValue={this.props.conf.initial_frequency}
            max={this.props.conf.max_frequency}
            min={this.props.conf.min_frequency}
            step={this.props.conf.step_frequency}

            onChange={(ev, freq)=>{this.props.dispatch(changeFrequency(freq));}}
            // onChangeCommitted={(ev, freq)=>{this.props.dispatch(changeFrequency(freq));}}
            // marks={marks}
            valueLabelDisplay="on"

          /> */}


<button style={{position:"absolute", top:"72%", left:"45vw", width:"10%"}} onClick={()=>{this.props.playingMusicFunction();}}>Turn on</button>

        </div>

      </>
    );
  }

}