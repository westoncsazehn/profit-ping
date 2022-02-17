import { RecaptchaVerifier } from '@firebase/auth';

export type RecaptchaVerifierType = null | RecaptchaVerifier;

export type RecaptchaStateType = {
  recaptchaVerifier: RecaptchaVerifierType;
  captchaId: number;
  confirmationResult?: any;
};
