let GLOBAL_CONFIG = require('../config/config.js');

function currentFrequencyReducer(state = [], action){
  let tracks = Object.assign([], state);
  let i;

  switch (action.type){
  case 'START_RADIO':
    console.log("Starting radio with initial frequency: "+ action.freq);
    return GLOBAL_CONFIG.initial_frequency;

  case 'CHANGE_FREQUENCY':
    console.log("Frequency change to: " + action.freq);
    return action.freq;

  default:
    return state;
  }

}

export default currentFrequencyReducer;