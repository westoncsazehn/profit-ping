// 3rd party
import React from 'react';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { signInWithPopup } from 'firebase/auth';
// local
import { userActionTypes } from './actions';
import { auth, provider } from '../../api';

function* signInUserSaga(): any {
  try {
    const { user } = yield call(signInWithPopup, auth, provider);
    yield put({ type: userActionTypes.SIGN_IN_USER_SUCCESS, payload: user });
    // TODO: implement an alert
    // @ts-ignore
  } catch (e: any) {
    yield put({
      type: userActionTypes.SIGN_IN_USER_FAILED,
      message: e.message
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
