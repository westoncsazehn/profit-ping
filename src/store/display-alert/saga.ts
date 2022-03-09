// 3rd party
import { all, takeEvery, put, delay } from 'redux-saga/effects';
// local
import { DisplayAlertType } from '../types';
import {
  DISPLAY_ALERT_TIMEOUT,
  displayAlertActionTypes,
  resetAlert,
  setAlert
} from './actions';

function* triggerDisplayMessageSaga({
  payload
}: {
  payload: DisplayAlertType;
}) {
  yield put(setAlert(payload));
  yield delay(DISPLAY_ALERT_TIMEOUT);
  yield put(resetAlert());
}

function* displayAlertSagas() {
  yield all([
    takeEvery(
      // @ts-ignore
      displayAlertActionTypes.INIT_ALERT,
      triggerDisplayMessageSaga
    )
  ]);
}

export default displayAlertSagas;
