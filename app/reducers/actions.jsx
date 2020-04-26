export function scormConnected(scorm){
  return {
    type:'SCORM_CONNECTED',
    scorm:scorm,
  };
}

export function updateUserProfile(user_profile){
  return {
    type:'UPDATE_USER_PROFILE',
    user_profile:user_profile,
  };
}

export function addObjectives(objectives){
  return {
    type:'ADD_OBJECTIVES',
    objectives:objectives,
  };
}

export function objectiveAccomplished(objectiveId, accomplishedScore = null){
  return {
    type:'OBJECTIVE_ACCOMPLISHED',
    objective_id:objectiveId,
    accomplished_score:accomplishedScore,
  };
}

export function loaded(is_loaded = true){
  return {
    type:'LOADED',
    loaded:is_loaded,
  };
}

// Radio actions

export function updateTracks(tracks){
  return {
    type:'UPDATE_TRACKS',
    tracks:tracks,
  };
}

export function updateCassetteTracks(tracks){
  return {
    type:'UPDATE_CASSETTE_TRACKS',
    tracks:tracks,
  };
}

export function changeFrequency(freq){
  return {
    type:'CHANGE_FREQUENCY',
    freq:freq,
  };
}

export function trackCompleted(id){
  return {
    type:'TRACK_COMPLETED',
    id:id,
  };
}
export function cassetteTrackCompleted(id, trackNumber){
  return {
    type:'CASSETTE_TRACK_COMPLETED',
    payload:{
      id:id,
      trackNumber:trackNumber,
    },
  };
}

export function radioTracksCompleted(){
  return {
    type:'RADIO_TRACKS_COMPLETED',
  };
}

export function cassetteTracksCompleted(){
  return {
    type:'CASSETTE_TRACKS_COMPLETED',
  };
}