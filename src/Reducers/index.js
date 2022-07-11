import { combineReducers } from 'redux';
import receipt from './receipt';
import modal from './modal';

const allReducers = combineReducers({
  receipt,
  modal,
});

export default allReducers;
