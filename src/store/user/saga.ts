// 3rd party
import { all, call, takeEvery, put, select } from 'redux-saga/effects';
import { doc, getDoc } from 'firebase/firestore';
import { AlertColor } from '@mui/material';
// local
import { BASE_URL, PORTFOLIO_URL } from '../../pages/common';
import { getNavigatePath, navigateTo } from '../navigate';
import { db, SUBSCRIBERS_DB } from '../../api';
import { initAlert } from '../display-alert';
import { setIsLoading } from '../loading';
import { getUser } from './selectors';
import { FBUser } from '../types';
import {
  setSubscribeStateSuccess,
  setUserSuccess,
  userActionTypes
} from './actions';

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

function* setSubscribeState(): any {
  try {
    const { uid } = yield select(getUser);
    if (uid) {
      const subscribersRef = yield doc(db, SUBSCRIBERS_DB, uid);
      const subscribersSnapshot = yield call(getDoc, subscribersRef);
      yield put(setSubscribeStateSuccess(subscribersSnapshot?.exists()));
    }
  } catch (_: any) {
    yield put(setSubscribeStateSuccess());
  }
}

function* userSagas() {
  yield all([
    takeEvery(
      // @ts-ignore
      userActionTypes.SET_USER,
      setUserSaga
    ),
    takeEvery(
      // @ts-ignore
      userActionTypes.SET_SUBSCRIBE_STATE,
      setSubscribeState
    )
  ]);
}

export default userSagas;
