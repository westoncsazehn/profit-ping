// 3rd party
import { all, takeEvery, put, call } from 'redux-saga/effects';
import { signInWithPhoneNumber } from 'firebase/auth';
import { AlertColor } from '@mui/material';
// local
import { initAlert } from '../display-alert';
import { PORTFOLIO_URL } from '../../pages/common';
import { addPhoneNumberFB } from '../phone-number';
import { RecaptchaVerifierType } from '../types';
import { setIsLoading } from '../loading';
import { navigateTo } from '../navigate';
import { auth } from '../../api';
import {
  recaptchaActionTypes,
  resetRecaptchaState,
  setRecaptchaIDFailed,
  setRecaptchaIDSuccess,
  signInWithPhoneSuccess
} from './actions';

// STEP 1: render captcha input on page and set captcha id
function* setCaptchaIdByRenderSaga({
  payload: { recaptchaVerifier }
}: {
  payload: { recaptchaVerifier: RecaptchaVerifierType };
}): any {
  try {
    let newCaptchaId: number = 0;
    if (recaptchaVerifier) {
      newCaptchaId = yield call(recaptchaVerifier.render);
    }
    if (newCaptchaId && recaptchaVerifier) {
      yield call(recaptchaVerifier.verify);
    }
    yield put(setRecaptchaIDSuccess(newCaptchaId));
  } catch (e) {
    yield put(setRecaptchaIDFailed());
  }
}

// STEP 2: Register phone number with Firebase's phone provider
function* signInWithPhoneSaga({
  payload: { phoneNumber, recaptchaVerifier }
}: {
  payload: { phoneNumber: number; recaptchaVerifier: RecaptchaVerifierType };
}): any {
  yield put(setIsLoading(true));
  try {
    const confirmationResult = yield call(
      // @ts-ignore
      signInWithPhoneNumber,
      auth,
      `+1${phoneNumber}`,
      recaptchaVerifier
    );
    yield put(signInWithPhoneSuccess(confirmationResult));
    yield put(setIsLoading());
  } catch (e) {
    yield put(resetRecaptchaState());
    yield put(setIsLoading());
    yield put(
      initAlert({
        open: true,
        message: String(e),
        severity: 'error' as AlertColor
      })
    );
  }
}

// STEP 3: Confirm validate code from sms, sign-in user, then navigate to
// Portfolio page
function* submitPhoneVerificationCode(confirmation: any, code: number): any {
  return yield confirmation.confirm(code);
}
function* verifyPhoneCodeSaga({
  payload: { captchaConfirmation, value }
}: {
  payload: { captchaConfirmation: any; value: number };
}): any {
  yield put(setIsLoading(true));
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
    yield put(resetRecaptchaState());
    yield put(navigateTo(PORTFOLIO_URL));
    yield put(setIsLoading());
  } catch (e) {
    yield put(setIsLoading());
    yield put(
      initAlert({
        open: true,
        message: `Incorrect validation code.`,
        severity: 'error' as AlertColor
      })
    );
  }
}

function* recaptchaSagas() {
  yield all([
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
