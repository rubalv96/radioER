import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import trackingReducer from './trackingReducer';
import scormReducer from './scormReducer';
import userProfileReducer from './userProfileReducer';
import waitForUserProfileReducer from './waitForUserProfileReducer';
import radioTracksReducer from "./radioTracksReducer";
import currentFrequencyReducer from "./currentFrequencyReducer";
import cassetteTracksReducer from "./cassetteTracksReducer";
import radioTracksCompletedReducer from "./radioTracksCompletedReducer"
import cassetteTracksCompletedReducer from "./cassetteTracksCompletedReducer"
import {radioTracksCompleted} from "./actions";

const GlobalState = combineReducers({
  loading:loadingReducer,
  tracking:trackingReducer,
  scorm:scormReducer,
  user_profile:userProfileReducer,
  wait_for_user_profile:waitForUserProfileReducer,
  radioTracks:radioTracksReducer,
  radioTracksCompleted:radioTracksCompletedReducer,
  cassetteTracks: cassetteTracksReducer,
  cassetteTracksCompleted: cassetteTracksCompletedReducer,
  current_frequency:currentFrequencyReducer,
});

export default GlobalState;