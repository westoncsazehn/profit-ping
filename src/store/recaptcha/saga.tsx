// 3rd party
import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
import {
  signInWithPhoneNumber,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
// local
import { recaptchaActionTypes } from './actions';
import { RecaptchaVerifierType } from '../types';
import { loadingActionTypes } from '../loading';
import { displayAlertActionTypes } from '../display-alert';
import { auth } from '../../api';
import { addPhoneNumberFB } from '../phone-number';
import { PORTFOLIO_URL } from '../../pages/common';
import { navigateTo } from '../navigate';

function* setRecaptchaVerifierSaga({
  payload
}: {
  payload: {
    recaptchaVerifier: RecaptchaVerifierType;
  };
}) {
  try {
    yield put({
      type: recaptchaActionTypes.SET_RECAPTCHA_VERIFIER_SUCCESS,
      // @ts-ignore
      payload
    });
  } catch (e) {
    yield put({
      type: recaptchaActionTypes.SET_RECAPTCHA_VERIFIER_FAILED
    });
  }
}
function* setCaptchaIdByRenderSaga({
  payload: { recaptchaVerifier }
}: {
  payload: { recaptchaVerifier: RecaptchaVerifierType };
}): any {
  try {
    let newCaptchaId: number = 0;
    let newRecaptchaVerifier = recaptchaVerifier;
    if (recaptchaVerifier) {
      newCaptchaId = yield call(recaptchaVerifier.render);
    }
    if (newCaptchaId && recaptchaVerifier) {
      newRecaptchaVerifier = yield call(recaptchaVerifier.verify);
    }
    yield put({
      type: recaptchaActionTypes.SET_RECAPTCHA_ID_SUCCESS,
      payload: {
        captchaId: newCaptchaId,
        recaptchaVerifier: newRecaptchaVerifier
      }
    });
  } catch (e) {
    yield put({
      type: recaptchaActionTypes.SET_RECAPTCHA_ID_FAILED
    });
  }
}

function* submitPhoneVerificationCode(confirmation: any, code: number): any {
  return yield confirmation.confirm(code);
}

function* verifyPhoneCodeSaga({
  payload: { captchaConfirmation, value }
}: {
  payload: { captchaConfirmation: any; value: number };
}): any {
  yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
  try {
    const response = yield submitPhoneVerificationCode(
      captchaConfirmation,
      value
    );
    const phoneNumber: string = response?.user?.phoneNumber || '';
    const uid = auth.currentUser?.uid || '';
    if (phoneNumber && uid) {
      yield addPhoneNumberFB(uid, phoneNumber);
    }
    yield put(navigateTo(PORTFOLIO_URL));
  } catch (e) {
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Incorrect validation code.`,
        severity: 'error' as AlertColor
      }
    });
  }
}

function* signInWithPhoneSaga({
  payload: { phoneNumber, recaptchaVerifier }
}: {
  payload: { phoneNumber: number; recaptchaVerifier: RecaptchaVerifierType };
}): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    // yield call(setPersistence, auth, browserSessionPersistence);
    const confirmationResult = yield call(
      // @ts-ignore
      signInWithPhoneNumber,
      auth,
      `+1${phoneNumber}`,
      recaptchaVerifier
    );
    yield put({
      type: recaptchaActionTypes.SIGN_IN_WITH_PHONE_SUCCESS,
      payload: confirmationResult
    });
    yield navigateTo(PORTFOLIO_URL);
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  } catch (e) {
    yield put({
      type: recaptchaActionTypes.SIGN_IN_WITH_PHONE_FAILED
    });
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

function* recaptchaSagas() {
  yield all([
    takeEvery(
      // @ts-ignore
      recaptchaActionTypes.SET_RECAPTCHA_VERIFIER,
      setRecaptchaVerifierSaga
    ),
    takeEvery(
      // @ts-ignore
      recaptchaActionTypes.SET_RECAPTCHA_ID,
      setCaptchaIdByRenderSaga
    ),
    takeEvery(
      // @ts-ignore
      recaptchaActionTypes.VERIFY,
      verifyPhoneCodeSaga
    ),
    takeEvery(
      // @ts-ignore
      recaptchaActionTypes.SIGN_IN_WITH_PHONE,
      signInWithPhoneSaga
    )
  ]);
}

export default recaptchaSagas;
