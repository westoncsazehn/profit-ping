import { all, takeEvery, put, delay } from 'redux-saga/effects';
import { DISPLAY_ALERT_TIMEOUT, displayAlertActionTypes } from './actions';
import { DisplayAlertType } from '../types';

function* triggerDisplayMessageSaga({
  payload
}: {
  payload: DisplayAlertType;
}) {
  yield put({ type: displayAlertActionTypes.SET_ALERT, payload });
  yield delay(DISPLAY_ALERT_TIMEOUT);
  yield put({
    type: displayAlertActionTypes.RESET
  });
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
