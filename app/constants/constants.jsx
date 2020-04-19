export const INITIAL_STATE = {
  loading:true,
  tracking:{
    progress_measure:0,
    score:0,
    objectives:{},
    finished:false,
  },
  scorm:null,
  user_profile:{
    id:undefined,
    name:"Unknown",
    learner_preference:{},
  },
  wait_for_user_profile:false,
  radioTracks:[],
  radioTracksCompleted: false,
  cassetteTracks:[],
  cassetteTracksCompleted: false,
  current_frequency:0,
};