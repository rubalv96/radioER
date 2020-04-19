let GLOBAL_CONFIG = require('../config/config.js');

function cassetteTracksCompletedReducer(state = [], action){

  switch (action.type){
  case 'CASSETTE_TRACKS_COMPLETED':
    return true;


  default:
    return state;
  }

}

export default cassetteTracksCompletedReducer;