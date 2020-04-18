import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cassette from './Cassette';
export default class AudioCassettes extends React.Component {

  constructor(){
    super();

  }

  render(){


    return (
        <div>
             <img id="shelving" src="./assets/images/estante.png"/>


        <div id="cassettesGroup">

            <Cassette
                albumTitle="Album 1"
                artistName="Artist 1"
                onSelectCassette = {this.props.onSelectCassette}
                trackNumber={this.props.trackNumber}
                cassetteTracks = {this.props.cassetteTracks}
                playingCassette = {this.props.playingCassette}
                stopPlaying={this.props.stopPlaying}
                muted = {this.props.muted}
                onEnded = {this.props.onEnded}
            />
        </div>
    </div>
    );
  }

}