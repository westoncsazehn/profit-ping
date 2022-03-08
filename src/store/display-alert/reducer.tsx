import { displayAlertActionTypes } from './actions';
import { DisplayAlertType } from '../types';

export const initialDisplayAlertState = {
  open: false,
  message: ''
};

export const displayAlertReducer = (
  state = initialDisplayAlertState,
  {
    type,
    payload
  }: { type: keyof typeof displayAlertActionTypes; payload: DisplayAlertType }
) => {
  switch (type) {
    case displayAlertActionTypes.SET_ALERT:
      return {
        open: Boolean(payload?.open),
        message: payload?.message || '',
        severity: payload?.severity
      };
    case displayAlertActionTypes.RESET_ALERT:
      return {
        open: false,
        message: '',
        severity: undefined
      };
    default:
      return state;
  }
};
