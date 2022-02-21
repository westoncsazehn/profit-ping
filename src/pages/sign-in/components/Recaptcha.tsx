// 3rd party
import React, { useEffect } from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
// local
import { RecaptchaVerifierType } from '../../../store';
import { auth } from '../../../api';

export const Recaptcha = ({
  hasRender,
  recaptchaVerifier,
  setRecaptchaVerifier,
  setCaptchaIdByRender
}: {
  hasRender: boolean;
  recaptchaVerifier: RecaptchaVerifierType;
  setRecaptchaVerifier: any;
  setCaptchaIdByRender: any;
}) => {
  useEffect(() => {
    if (!recaptchaVerifier) {
      setRecaptchaVerifier(
        new RecaptchaVerifier(
          'captcha-verifier',
          {
            size: 'invisible',
            callback: () => {}
          },
          auth
        )
      );
    }
    if (hasRender && recaptchaVerifier) {
      setCaptchaIdByRender(recaptchaVerifier);
    } else {
      recaptchaVerifier?.clear();
    }
  }, []);

  return (
    <>
      <div id="captcha-verifier" />
    </>
  );
};
