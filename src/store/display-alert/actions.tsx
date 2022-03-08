import { DisplayAlertType } from '../types';

export const DISPLAY_ALERT_TIMEOUT: number = 3000;
export const displayAlertActionTypes = {
  INIT_ALERT: 'INIT_ALERT',
  SET_ALERT: 'SET_ALERT',
  RESET_ALERT: 'RESET_ALERT'
};
export const initAlert = (displayAlert?: DisplayAlertType) => ({
  type: displayAlertActionTypes.INIT_ALERT,
  payload: displayAlert
});
export const resetAlert = () => ({
  type: displayAlertActionTypes.RESET_ALERT
});
