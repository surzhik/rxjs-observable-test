import { combineReducers } from 'redux';
import runtime from './runtime';
import display from './display';
import modeSwitch from './modeSwitch';
/* eslint-disable import/prefer-default-export */
export const rootReducer = combineReducers({
  runtime,
  display,
  modeSwitch,
});
