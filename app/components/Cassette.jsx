import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {DropdownButton, Dropdown} from 'react-bootstrap';

export default class AudioCassettes extends React.Component {

  constructor(){
    super();
  }

  render(){

    return (

   
        <div className="cassette">
            <p className="albumTitle">
                {this.props.albumTitle}
            </p>
            <p className="artistName">
                {this.props.artistName}
            </p>
        </div>
        
    );
  }

}