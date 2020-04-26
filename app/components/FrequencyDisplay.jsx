import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {CircleSlider} from "react-circle-slider";

import {changeFrequency} from '../reducers/actions';
export default class FrequencyDisplay extends React.Component {

  constructor(){
    super();
  }

  render(){

    let onOff = "";
    this.props.isActive ? onOff = "radioOn" : onOff = "radioOff";
    return (

      <div id="frequencyDisplay" className={onOff}>
            FREQUENCY    <b>{this.props.current_frequency.toFixed(2)} MHz</b>
      </div>
    );
  }

}