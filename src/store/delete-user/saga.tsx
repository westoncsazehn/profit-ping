// 3rd party
import { signOut } from '@firebase/auth';
import { AlertColor } from '@mui/material';
import { all, call, put, takeEvery } from 'redux-saga/effects';
// local
import { deleteUserActionTypes } from './actions';
import { BASE_URL } from '../../pages/common';
import { auth, deleteUser } from '../../api';
import { initAlert } from '../display-alert';
import { setIsLoading } from '../loading';
import { navigateTo } from '../navigate';

function* deleteUserSaga({
  payload: uid
}: {
  type: typeof deleteUserActionTypes.DELETE_USER;
  payload: string;
}): any {
  try {
    yield put(setIsLoading(true));
    // call cloud function endpoint to remove user's data by uid
    yield call(deleteUser, { uid });
    sessionStorage.removeItem('user');
    yield call(signOut, auth);
    yield put(navigateTo(BASE_URL));
    yield put(setIsLoading());
    yield put(
      initAlert({
        open: true,
        message: `Your account has been successfully removed.`,
        severity: 'success' as AlertColor
      })
    );
  } catch (e: any) {
    yield put(setIsLoading());
    yield put(
      initAlert({
        open: true,
        message:
          'Unable to remove user account at this time. Please see our FAQ page for help.',
        severity: 'error' as AlertColor
      })
    );
  }
}

function* deleteUserSagas() {
  yield all([
    // @ts-ignore
    takeEvery(deleteUserActionTypes.DELETE_USER, deleteUserSaga)
  ]);
}

export default deleteUserSagas;
