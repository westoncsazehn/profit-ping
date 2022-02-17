// 3rd party
import React, { useEffect } from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
// local
import { RecaptchaVerifierType } from '../../../store';
import { auth } from '../../../api';

export const Recaptcha = ({
  hasRender,
  recaptchaVerifier,
  setCaptchaIdByRender,
  setRecaptchaVerifier
}: {
  hasRender: boolean;
  recaptchaVerifier: RecaptchaVerifierType;
  setCaptchaIdByRender: any;
  setRecaptchaVerifier: any;
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
