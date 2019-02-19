import { MODE_SWITCH } from '../constants';

const initialValues = {
  nightMode: false,
};

export default function runtime(state = initialValues, action) {
  switch (action.type) {
    case MODE_SWITCH:
      return {
        ...state,
        nightMode: action.payload,
      };
    default:
      return state;
  }
}
