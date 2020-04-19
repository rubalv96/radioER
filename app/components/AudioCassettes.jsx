import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cassette from './Cassette';
export default class AudioCassettes extends React.Component {

  constructor(){
    super();

  }

  render(){

    let cassettes = this.props.cassetteTracks;



    return (
        <div>
             <img id="shelving" src="./assets/images/estante.png"/>


        <div id="cassettesGroup">

          {cassettes.map((cassette, ind)=>{
            return(
              <Cassette
                key={ind}
                id={cassette.id}
                albumTitle={cassette.title}
                artistName={cassette.artist}
                onSelectCassette = {this.props.onSelectCassette}
                trackNumber={this.props.trackNumber}
                cassetteTracks = {this.props.cassetteTracks[ind]}
                playingCassette = {this.props.playingCassette}
                stopPlaying={this.props.stopPlaying}
                muted = {this.props.muted}
                onEnded = {this.props.onEnded}
                isSelected = {this.props.idCassetteSelected === cassette.id}
              />
            );
          })}

        </div>
    </div>
    );
  }

}