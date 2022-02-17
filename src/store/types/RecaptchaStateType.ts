import { RecaptchaVerifier } from '@firebase/auth';

export type RecaptchaVerifierType = null | RecaptchaVerifier;

export type RecaptchaStateType = {
  captchaId: number;
  confirmationResult?: any;
};
