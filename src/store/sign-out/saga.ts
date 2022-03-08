// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { signOutActions } from './actions';
import { navigateTo } from '../navigate';
import { SIGN_IN_URL } from '../../pages/common';
import { signOut } from 'firebase/auth';
import { auth } from '../../api';
import { loadingActionTypes } from '../loading';
import { displayAlertActionTypes } from '../display-alert';
import { GREP_CATCHA_STORAGE_KEY } from '../../values';
import { portfolioActionTypes } from '../portfolio';
import { addCoinActionTypes } from '../add-coin';
import { cryptoAPIActionTypes } from '../crypto-api';

function* resetAppState(): any {
  yield put({ type: portfolioActionTypes.RESET_PORTFOLIO });
  yield put({ type: addCoinActionTypes.SET_DEFAULT_SELECTED_COIN });
  yield put({ type: cryptoAPIActionTypes.RESET_CRYPTO_API });
}

function* signOutSaga(): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    yield localStorage.removeItem(GREP_CATCHA_STORAGE_KEY);
    yield call(signOut, auth);
    yield navigateTo(SIGN_IN_URL);
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: 'Successfully signed out.',
        severity: 'success' as AlertColor
      }
    });
    yield resetAppState();
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  } catch (e) {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: String(e),
        severity: 'error' as AlertColor
      }
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  }
}

function* signOutSagas() {
  yield all([
    takeEvery(
      // @ts-ignore
      signOutActions.SIGN_OUT,
      signOutSaga
    )
  ]);
}

export default signOutSagas;
