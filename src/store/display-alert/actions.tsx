import { DisplayAlertType } from '../types';

export const displayAlertActionTypes = {
  INIT_ALERT: 'INIT_ALERT'
};

export const initAlert = (displayAlert?: DisplayAlertType) => ({
  type: displayAlertActionTypes.INIT_ALERT,
  payload: displayAlert
});
