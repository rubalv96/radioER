import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CircleSlider } from "react-circle-slider";

export default class WheelSlider extends React.Component {

  constructor(){
    super();
      }
  
  
  render(){
    

   
    return (
      <>

            <CircleSlider 
                className={this.props.type}
                min={this.props.minValue}
                max ={this.props.maxValue}
                value={this.props.initialValue}
                stepSize = {this.props.step}
                progressWidth={0}
                circleWidth={0}
                knobColor="black"
                onChange={this.props.onChange}
              />


      </>
    );
  }

}