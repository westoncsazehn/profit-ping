import { RecaptchaVerifierType } from '../types';

export const recaptchaActionTypes = {
  DEFAULT: 'DEFAULT',
  SET_RECAPTCHA_ID: 'SET_RECAPTCHA_ID',
  SET_RECAPTCHA_ID_SUCCESS: 'SET_RECAPTCHA_ID_SUCCESS',
  SET_RECAPTCHA_ID_FAILED: 'SET_RECAPTCHA_ID_FAILED',
  SET_RECAPTCHA_VERIFIER: 'SET_RECAPTCHA_VERIFIER',
  SET_RECAPTCHA_VERIFIER_SUCCESS: 'SET_RECAPTCHA_VERIFIER_SUCCESS',
  SET_RECAPTCHA_VERIFIER_FAILED: 'SET_RECAPTCHA_VERIFIER_FAILED',
  VERIFY: 'VERIFY',
  SIGN_IN_WITH_PHONE: 'SIGN_IN_WITH_PHONE',
  SIGN_IN_WITH_PHONE_SUCCESS: 'SIGN_IN_WITH_PHONE_SUCCESS',
  SIGN_IN_WITH_PHONE_FAILED: 'SIGN_IN_WITH_PHONE_FAILED'
};

export const setCaptchaIdByRender = (
  recaptchaVerifier: RecaptchaVerifierType
) => ({
  type: recaptchaActionTypes.SET_RECAPTCHA_ID,
  payload: recaptchaVerifier
});
export const setRecaptchaVerifier = (
  recaptchaVerifier: RecaptchaVerifierType
) => ({
  type: recaptchaActionTypes.SET_RECAPTCHA_VERIFIER,
  payload: recaptchaVerifier
});
export const resetRecaptchaState = () => ({
  type: recaptchaActionTypes.DEFAULT
});
export const verifyPhoneCode = (captchaConfirmation: any, value: number) => ({
  type: recaptchaActionTypes.VERIFY,
  payload: { captchaConfirmation, value }
});
export const signInWithPhoneProv = (
  phoneNumber: number,
  recaptchaVerifier: RecaptchaVerifierType
) => ({
  type: recaptchaActionTypes.SIGN_IN_WITH_PHONE,
  payload: { phoneNumber, recaptchaVerifier }
});
