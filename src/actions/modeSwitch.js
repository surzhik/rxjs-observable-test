/* eslint-disable import/prefer-default-export */

import { MODE_SWITCH } from '../constants';

export function setModeSwitch(nightMode) {
  return {
    type: MODE_SWITCH,
    payload: nightMode,
  };
}
