import { combineEpics } from 'redux-observable';
import { displayEpic } from './display';
/* eslint-disable import/prefer-default-export */
export const rootEpic = combineEpics(displayEpic);
