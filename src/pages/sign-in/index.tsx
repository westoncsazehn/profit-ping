// 3rd party
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AlertColor, Box, Container } from '@mui/material';
// local
import { AddPhoneNumberForm, PhoneCodeVerificationField } from './components';
import {
  AppState,
  RecaptchaVerifierType,
  verifyPhoneCode,
  signInWithPhoneProv,
  setCaptchaIdByRender,
  RecaptchaStateType,
  resetRecaptchaState,
  DisplayAlertType
} from '../../store';
import { MIN_BOX_PAGE, StyledPaper } from "../common";

const mapDispatchToProps = (dispatch: any) => ({
  setCaptchaIdByRender: (recaptchaVerifier: RecaptchaVerifierType) =>
    dispatch(setCaptchaIdByRender(recaptchaVerifier)),
  resetRecaptchaState: () => dispatch(resetRecaptchaState()),
  verifyPhoneCode: (captchaConfirmation: any, value: number) =>
    dispatch(verifyPhoneCode(captchaConfirmation, value)),
  signInWithPhoneProv: (
    phoneNumber: number,
    recaptchaVerifier: RecaptchaVerifierType
  ) => dispatch(signInWithPhoneProv(phoneNumber, recaptchaVerifier))
});
const mapStateToProps = ({ displayAlert, recaptcha }: AppState) => ({
  displayAlert,
  recaptcha
});
const SignInPage = ({
  displayAlert: { severity },
  recaptcha: { confirmationResult },
  verifyPhoneCode,
  signInWithPhoneProv,
  setCaptchaIdByRender
}: {
  displayAlert: DisplayAlertType;
  recaptcha: RecaptchaStateType;
  verifyPhoneCode: any;
  signInWithPhoneProv: any;
  setCaptchaIdByRender: any;
}) => {
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] =
    useState<boolean>(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>();

  // reset Recaptcha state
  useEffect(() => setRecaptchaVerifier(null), []);
  // if error during phone sign-in, reset captcha
  useEffect(() => {
    if (('error' as AlertColor) === severity) {
      setRecaptchaVerifier(null);
    }
  }, [severity]);

  // handlers
  const onPhoneEdit = () => {
    setIsPhoneInputDisabled(false);
  };
  const onSubmitPhoneNumber = (newNumber: number) => {
    signInWithPhoneProv(newNumber, recaptchaVerifier);
  };
  const onCancelPhoneNumberForm = () => {
    setIsPhoneInputDisabled(true);
  };
  const onPhoneVerification = (verificationCode: number = 0) => {
    if (verificationCode) {
      verifyPhoneCode(confirmationResult, verificationCode);
      setIsPhoneInputDisabled(true);
    }
  };

  return (
    <>
      <Container sx={{ p: 0 }}>
        <Box component={StyledPaper} sx={MIN_BOX_PAGE}>
          <AddPhoneNumberForm
            phoneNumber={null}
            onSubmitPhoneNumber={onSubmitPhoneNumber}
            onCancelPhoneNumber={onCancelPhoneNumberForm}
            isDisabled={isPhoneInputDisabled}
            onPhoneEdit={onPhoneEdit}
            recaptchaVerifier={recaptchaVerifier}
            setRecaptchaVerifier={setRecaptchaVerifier}
            setCaptchaIdByRender={setCaptchaIdByRender}
          />
          {confirmationResult ? (
            <Box>
              <PhoneCodeVerificationField
                onPhoneVerification={onPhoneVerification}
                captchaConfirmation={confirmationResult}
                recaptchaVerifier={recaptchaVerifier}
              />
            </Box>
          ) : null}
        </Box>
      </Container>
    </>
  );
};

const SignInPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);
export default SignInPageRx;