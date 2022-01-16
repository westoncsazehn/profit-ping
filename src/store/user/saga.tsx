import { all, call, put, takeEvery } from 'redux-saga/effects';
import { userActionTypes } from './actions';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../api';

function* signInUserSaga(): any {
  try {
    console.log('sign in triggered');
    const { user } = yield call(signInWithPopup, auth, provider);
    yield put({ type: userActionTypes.SIGN_IN_USER_SUCCESS, payload: user });
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
