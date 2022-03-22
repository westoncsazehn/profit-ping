// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { GREP_CATCHA_STORAGE_KEY } from '../../values';
import { SIGN_IN_URL } from '../../pages/common';
import { resetSelectedCoin } from '../add-coin';
import { resetDetails } from '../subscription';
import { resetCryptoApi } from '../crypto-api';
import { resetPortfolio } from '../portfolio';
import { resetReCaptcha } from '../recaptcha';
import { initAlert } from '../display-alert';
import { signOutActions } from './actions';
import { setIsLoading } from '../loading';
import { navigateTo } from '../navigate';
import { resetPaypal } from '../paypal';
import { signOut } from 'firebase/auth';
import { resetUser } from "../user";
import { auth } from '../../api';

export function* resetAppState(): any {
  yield put(resetPortfolio());
  yield put(resetSelectedCoin());
  yield put(resetCryptoApi());
  yield put(resetReCaptcha());
  yield put(resetDetails());
  yield put(resetPaypal());
  yield put(resetUser());
}

function* signOutSaga(): any {
  try {
    yield put(setIsLoading(true));
    yield () => localStorage.removeItem(GREP_CATCHA_STORAGE_KEY);
    yield call(signOut, auth);
    yield resetAppState();
    yield put(navigateTo(SIGN_IN_URL));
    yield put(
      initAlert({
        open: true,
        message: 'Successfully signed out.',
        severity: 'success' as AlertColor
      })
    );
    yield put(setIsLoading());
  } catch (e) {
    yield put(setIsLoading(true));
    yield put(
      initAlert({
        open: true,
        message: String(e),
        severity: 'error' as AlertColor
      })
    );
    yield put(setIsLoading());
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
