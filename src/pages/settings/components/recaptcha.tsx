// 3rd party
import React, { useEffect } from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
// local
import { auth } from '../../../api';

export const Recaptcha = ({
  setCaptchaVerifier,
  captchaId,
  setCaptchaId,
  hasRender
}: {
  setCaptchaVerifier: any;
  captchaId: number;
  setCaptchaId: any;
  hasRender: boolean;
}) => {
  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      'captcha-verifier',
      {
        size: 'invisible',
        callback: (callback: any) => {
          console.log('callback', callback);
        }
      },
      auth
    );
    if (hasRender) {
      recaptchaVerifier
        .render()
        .then((id: number) => {
          console.log('captchaId', id);
          setCaptchaId(id);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      recaptchaVerifier.clear();
    }
    if (captchaId) {
      recaptchaVerifier
        .verify()
        .then((res: string) => {
          console.log('verified', res);
          setCaptchaVerifier(recaptchaVerifier);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <>
      <div id="captcha-verifier" />
    </>
  );
};
