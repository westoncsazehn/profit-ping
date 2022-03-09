// 3rd party
import { all, takeEvery, put, select } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { userActionTypes } from './actions';
import { loadingActionTypes } from '../loading';
import { displayAlertActionTypes } from '../display-alert';
import { BASE_URL, PORTFOLIO_URL } from "../../pages/common";
import { getNavigatePath, navigateTo } from '../navigate';
import { FBUser } from '../types';

function* setUserSaga({ payload }: { payload: FBUser }): any {
  yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
  try {
    const currentPath: string = yield select(getNavigatePath);
    const signedInPath: string = currentPath || PORTFOLIO_URL;
    const guestPath: string = currentPath || BASE_URL;
    const newPath: string = payload?.uid ? signedInPath : guestPath;
    yield put(navigateTo(newPath));
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
