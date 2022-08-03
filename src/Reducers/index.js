import { combineReducers } from 'redux';
import receipt from './receipt';
import modal from './modal';
import auth from './auth';

const allReducers = combineReducers({
  receipt,
  modal,
  auth,
});

export default allReducers;
