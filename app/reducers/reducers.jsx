import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import trackingReducer from './trackingReducer';
import scormReducer from './scormReducer';
import userProfileReducer from './userProfileReducer';
import waitForUserProfileReducer from './waitForUserProfileReducer';
import tracksReducer from "./tracksReducer";
import currentFrequencyReducer from "./currentFrequencyReducer";

const GlobalState = combineReducers({
  loading:loadingReducer,
  tracking:trackingReducer,
  scorm:scormReducer,
  user_profile:userProfileReducer,
  wait_for_user_profile:waitForUserProfileReducer,
  tracks:tracksReducer,
  current_frequency:currentFrequencyReducer,
});

export default GlobalState;