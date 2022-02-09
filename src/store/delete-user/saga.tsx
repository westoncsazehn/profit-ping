// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
// local
import { loadingActionTypes } from '../loading';
import { deleteUserActionTypes } from './actions';
import { auth, deleteUser } from '../../api';
import { signOut } from '@firebase/auth';
import { displayAlertActionTypes } from '../display-alert';
import { AlertColor } from '@mui/material';

function* deleteUserSaga({
  payload: uid
}: {
  type: typeof deleteUserActionTypes.DELETE_USER;
  payload: string;
}): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    window?.history?.back();
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    // call cloud function endpoint to remove user's data by uid
    yield call(deleteUser, { uid });
    sessionStorage.removeItem('user');
    yield call(signOut, auth);
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Your account has been successfully removed.`,
        severity: 'success' as AlertColor
      }
    });
  } catch (e: any) {
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message:
          'Unable to removed user account at this time. Please see our FAQ page for help.',
        severity: 'error' as AlertColor
      }
    });
  }
}

function* deleteUserSagas() {
  yield all([
    // @ts-ignore
    takeEvery(deleteUserActionTypes.DELETE_USER, deleteUserSaga)
  ]);
}

export default deleteUserSagas;
