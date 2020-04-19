let GLOBAL_CONFIG = require('../config/config.js');

function radioTracksCompletedReducer(state = [], action){

  switch (action.type){
  case 'RADIO_TRACKS_COMPLETED':
    return true;


  default:
    return state;
  }

}

export default radioTracksCompletedReducer;