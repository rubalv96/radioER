let GLOBAL_CONFIG = require('../config/config.js');

function cassetteTracksReducer(state = [], action){
  let tracks = Object.assign([], state);
  let i, new_tracks;

  switch (action.type){
  case 'UPDATE_CASSETTE_TRACKS':
    return action.tracks;



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