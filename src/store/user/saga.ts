// 3rd party
import { all, takeEvery, put } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { userActionTypes } from './actions';
import { loadingActionTypes } from '../loading';
import { displayAlertActionTypes } from '../display-alert';
import { PORTFOLIO_URL, SIGN_IN_URL } from '../../pages/common';
import { navigationActionTypes } from '../navigate';
import { FBUser } from '../types';

function* setUserSaga({ payload }: { payload: FBUser }): any {
  yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
  try {
    yield put({
      type: navigationActionTypes.NAVIGATE_TO,
      payload: payload?.uid ? PORTFOLIO_URL : SIGN_IN_URL
    });
    yield put({ type: userActionTypes.SET_USER_SUCCESS, payload: payload });
  } catch (e) {
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: String(e),
        severity: 'error' as AlertColor
      }
    });
  }
  yield put({ type: loadingActionTypes.SET_IS_LOADING });
}

function* userSagas() {
  yield all([
    takeEvery(
      // @ts-ignore
      userActionTypes.SET_USER,
      setUserSaga
    )
  ]);
}

export default userSagas;
