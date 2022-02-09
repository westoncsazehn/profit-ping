// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { signInWithPopup } from 'firebase/auth';
// local
import { userActionTypes } from './actions';
import { auth, provider } from '../../api';
import { loadingActionTypes } from '../loading';
import { FBUser } from '../types';
import { displayAlertActionTypes } from '../display-alert';
import { AlertColor } from '@mui/material';

function* signInUserSaga(): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const { user }: { user: FBUser } = yield call(
      signInWithPopup,
      auth,
      provider
    );
    yield put({ type: userActionTypes.SIGN_IN_USER_SUCCESS, payload: user });
    window?.history?.go(0);
  } catch (e: any) {
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: 'Unable to authenticate user.',
        severity: 'error' as AlertColor
      }
    });
  }
}

function* userSagas() {
  yield all([
    // @ts-ignore
    takeEvery(userActionTypes.SIGN_IN_USER, signInUserSaga)
  ]);
}

export default userSagas;
