// 3rd party
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Container, Paper, styled } from '@mui/material';
// local
import { AddPhoneNumberForm, PhoneVerificationField } from './components';
import {
  AppState,
  RecaptchaStateType,
  setCaptchaIdByRender,
  RecaptchaVerifierType,
  setRecaptchaVerifier,
  resetRecaptchaState,
  verifyPhoneCode,
  signInWithPhoneProv
} from '../../store';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '3rem'
  }
}));
const mapDispatchToProps = (dispatch: any) => ({
  setRecaptchaVerifier: (rv: RecaptchaVerifierType) =>
    dispatch(setRecaptchaVerifier(rv)),
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
const mapStateToProps = ({ recaptcha }: AppState) => ({
  recaptcha
});
const SignInPage = ({
  recaptcha: { recaptchaVerifier, confirmationResult },
  setRecaptchaVerifier,
  setCaptchaIdByRender,
  resetRecaptchaState,
  verifyPhoneCode,
  signInWithPhoneProv
}: {
  recaptcha: RecaptchaStateType;
  setRecaptchaVerifier: any;
  setCaptchaIdByRender: any;
  resetRecaptchaState: any;
  verifyPhoneCode: any;
  signInWithPhoneProv: any;
}) => {
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] =
    useState<boolean>(true);
  const phoneVerificationFieldRef = useRef();

  // reset Recaptcha state
  useEffect(() => resetRecaptchaState(), []);
  useEffect(() => {
    // @ts-ignore
    if (Boolean(phoneVerificationFieldRef?.current.children?.length > 0)) {
      setIsPhoneInputDisabled(true);
    }
  }, [phoneVerificationFieldRef]);

  // handlers
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
  const onPhoneEdit = () => {
    setIsPhoneInputDisabled(false);
  };

  return (
    <>
      <Container sx={{ p: 0 }}>
        <Box component={StyledPaper}>
          <AddPhoneNumberForm
            phoneNumber={0}
            onSubmitPhoneNumber={onSubmitPhoneNumber}
            onCancelPhoneNumber={onCancelPhoneNumberForm}
            isDisabled={isPhoneInputDisabled}
            onPhoneEdit={onPhoneEdit}
            recaptchaVerifier={recaptchaVerifier}
            setRecaptchaVerifier={setRecaptchaVerifier}
            setCaptchaIdByRender={setCaptchaIdByRender}
          />
          {/*// @ts-ignore*/}
          <Box ref={phoneVerificationFieldRef}>
            <PhoneVerificationField
              onPhoneVerification={onPhoneVerification}
              captchaConfirmation={confirmationResult}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const SignInPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);
