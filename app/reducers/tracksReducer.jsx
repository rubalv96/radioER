let GLOBAL_CONFIG = require('../config/config.js');

function tracksReducer(state = [], action){
  let tracks = Object.assign([], state);
  let i, new_tracks;

  switch (action.type){
  case 'START_RADIO':

    // Load the noise sound
    tracks.push(
      {
        "id":0,
        "path":"./assets/sounds/whiteNoise.mp3",
        "frequency":0,
        "volume":1,
      }
    );

    // Load the initial State with the tracks defined in the Config file
    for(i = 1; i < 50; i++){
      if(typeof (GLOBAL_CONFIG["path_track_" + i]) === "string"){
        tracks.push(
          {
            "id":i,
            "path":GLOBAL_CONFIG["path_track_" + i],
            "frequency":GLOBAL_CONFIG["frequency_track_" + i],
            "volume":0,
          }
        );
      }
    }
    console.log("Tracks(Starting Radio): " + JSON.stringify(tracks));
    return tracks;

  case 'CHANGE_FREQUENCY':

    new_tracks = tracks.map((track, index)=>{

      if(isNoiseSound(track)){
        track.volume = setNoiseVolume(tracks);
      }

      else if(isCloseToFrequency(action.freq, track.frequency, GLOBAL_CONFIG.delta)){
        console.log("Near track: " + JSON.stringify(track));

        track.volume = setVolume(distanceToFrequency(action.freq, track.frequency), GLOBAL_CONFIG.delta);
      }
      else{
        track.volume = 0;
      }
      return track;
    });
    // console.log("Tracks final: "+ JSON.stringify(new_tracks));

    return new_tracks;

  default:
    return state;
  }

}

function isNoiseSound(track){
  return (track.id === 0);
}

function setNoiseVolume(tracks){
  let max_volume = 0;
  tracks.forEach(track => {
    if(track.volume> max_volume){
      max_volume =track.volume;
    }
  });

  let noise_volume= 1 - max_volume;
  return noise_volume;
}

function isCloseToFrequency(current_frequency, track_frequency, delta){
  let isClose = (current_frequency <= (track_frequency + delta) && (current_frequency >= (track_frequency - delta)));

  console.log("isCloseToFrequency: " + isClose);
  return isClose;
}

function distanceToFrequency(current_frequency, track_frequency){
  console.log("Distance to Freq: " + Math.abs(current_frequency - track_frequency));

  return Math.abs(current_frequency - track_frequency);
}

function setVolume(distance, delta){
  let normalized_distance, volume;
  delta === 0 ? normalized_distance = 0 : normalized_distance = distance / delta;
  volume = (1 - normalized_distance);
  console.log("Volume: " + volume);
  return volume;
}
export default tracksReducer;