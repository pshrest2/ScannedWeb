import { combineReducers } from 'redux';
import receipt from './receipt';
import modal from './modal';
import column from './column';

const allReducers = combineReducers({
  receipt,
  modal,
  column,
});

export default allReducers;
