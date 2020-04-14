import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@material-ui/core/Slider';
import WheelSlider from './WheelSlider';
import FrequencyDisplay from './FrequencyDisplay';
import {changeFrequency} from '../reducers/actions';
import AudioCassettes from './AudioCassettes';

export default class RadioImage extends React.Component {

  constructor(){
    super();
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);

  }

  handleFrequencyChange(freq){
    this.props.dispatch(changeFrequency(freq));
  }
  createMarks(){
    let fmin = this.props.conf.min_frequency;
    let fmax = this.props.conf.max_frequency;
    let marks = [];
    let f = fmin;
    while(f <= fmax){
      if(f % 5 === 0){
        marks.push({
          value:f,
          label:f.toString() + " Mhz",
        });
      }

      f++;
    }
    return marks;
  }

  render(){

    let color;
    this.props.playingMusicValue ? color = "buttonOn" : color = "buttonOff";
    const marks = [];
    return (
      <>

        <div id="radioContainer">
          <img id="radioImg" src="./assets/images/radio.png"/>
          <button id="btnOnOff" onClick={()=>{this.props.playingMusicFunction();}}/>
          <Slider
            id="frequencySlider"
            className={this.props.playingMusicValue ? "radioOn" : "radioOff"}
            value={this.props.current_frequency}
            defaultValue={this.props.conf.initial_frequency}
            max={this.props.conf.max_frequency}
            min={this.props.conf.min_frequency}
            step={this.props.conf.step_frequency}

            onChange={(ev, freq)=>{this.props.dispatch(changeFrequency(freq));}}
            // onChangeCommitted={(ev, freq)=>{this.props.dispatch(changeFrequency(freq));}}
            valueLabelDisplay="off"
            marks={this.createMarks()}

          />

          <WheelSlider
            minValue = {this.props.conf.min_frequency}
            maxValue = {this.props.conf.max_frequency}
            initialValue={this.props.current_frequency}
            step = {this.props.conf.step_frequency}
            conf = {this.props.conf}
            dispatch = {this.props.dispatch}
            onChange = {this.handleFrequencyChange}
          />

          <div id="volumeRoundSlider">
            <WheelSlider
              type= "frequencyRoundSlide"
              minValue = {0}
              maxValue = {1}
              initialValue={0.5}
              step = {0.05}
              conf = {this.props.conf}
              dispatch = {this.props.dispatch}
              onChange= {(volume)=>{this.props.globalVolumeFunction(volume);}}

            />
          </div>

          <div id="lightOnOff" className={color} />

          <FrequencyDisplay
            isActive={this.props.playingMusicValue}
            current_frequency = {this.props.current_frequency}
          />

          <AudioCassettes/>
        </div>

      </>
    );
  }

}