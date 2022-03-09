// 3rd party
import { all, takeEvery, put, select } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { BASE_URL, PORTFOLIO_URL } from '../../pages/common';
import { setUserSuccess, userActionTypes } from './actions';
import { getNavigatePath, navigateTo } from '../navigate';
import { initAlert } from '../display-alert';
import { FBUser } from '../types';
import { setIsLoading } from '../loading';

function* setUserSaga({ payload }: { payload: FBUser }): any {
  try {
    const currentPath: string = yield select(getNavigatePath);
    const signedInPath: string = currentPath || PORTFOLIO_URL;
    const guestPath: string = currentPath || BASE_URL;
    const newPath: string = payload?.uid ? signedInPath : guestPath;
    yield put(navigateTo(newPath));
    yield put(setUserSuccess(payload));
    if (!Boolean(payload?.uid)) {
      yield put(setIsLoading());
    }
  } catch (_: any) {
    yield put(
      initAlert({
        open: true,
        message: 'Unable to sign-in/sign-up user. Please try again later.',
        severity: 'error' as AlertColor
      })
    );
  }
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
