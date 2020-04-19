let GLOBAL_CONFIG = require('../config/config.js');

function cassetteTracksReducer(state = [], action){
  let cassettes = Object.assign([], state);
  let i, new_cassettes;

  switch (action.type){
  case 'UPDATE_CASSETTE_TRACKS':
    return action.tracks;

  case 'CASSETTE_TRACK_COMPLETED':
    console.log("ACCION CASSETTE_TRACK_COMPLETES");
    cassettes[action.payload.id -1].tracks[action.payload.trackNumber].completed = true;
    console.log("Cassette track completed" + JSON.stringify(cassettes[action.payload.id -1].tracks));
    return cassettes;


  // case 'TRACK_COMPLETED':
  //   new_tracks = tracks.map((track, index)=>{
  //     if(track.id === action.id){
  //       track.completed = true;
  //     }
  //     return track;
  //   });
  //
  //   return new_tracks;

  default:
    return state;
  }

}

export default cassetteTracksReducer;