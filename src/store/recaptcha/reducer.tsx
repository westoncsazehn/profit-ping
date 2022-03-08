import { RecaptchaStateType } from '../types';
import { recaptchaActionTypes } from './actions';

const initialRecaptchaState: RecaptchaStateType = {
  captchaId: 0,
  confirmationResult: null
};

export const recaptchaReducer = (
  state = initialRecaptchaState,
  { type, payload }: { type: keyof typeof recaptchaActionTypes; payload: any }
) => {
  switch (type) {
    case recaptchaActionTypes.SET_RECAPTCHA_ID_SUCCESS:
      return {
        captchaId: payload.captchaId
      };
    case recaptchaActionTypes.SIGN_IN_WITH_PHONE_SUCCESS:
      return { ...state, confirmationResult: payload };
    case recaptchaActionTypes.RESET_RECAPTCHA:
      return { ...state, captchaId: null, confirmationResult: null };
    case recaptchaActionTypes.DEFAULT:
    case recaptchaActionTypes.SET_RECAPTCHA_ID_FAILED:
    case recaptchaActionTypes.SET_RECAPTCHA_VERIFIER_FAILED:
    default:
      return { ...state };
  }
};
