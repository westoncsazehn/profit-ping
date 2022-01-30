import { displayAlertActionTypes } from './actions';
import { DisplayAlertType } from '../types';

const displayAlertState = {
  open: false,
  message: ''
};

export const displayAlertReducer = (
  state = displayAlertState,
  {
    type,
    payload
  }: { type: keyof typeof displayAlertActionTypes; payload: DisplayAlertType }
) => {
  switch (type) {
    case displayAlertActionTypes.INIT_ALERT:
      return { ...state, ...payload };
    default:
      return state;
  }
};
