// 3rd party
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Container, Paper, styled } from '@mui/material';
// local
import { AddPhoneNumberForm, PhoneVerificationField } from './components';
import {
  AppState,
  RecaptchaVerifierType,
  verifyPhoneCode,
  signInWithPhoneProv,
  setCaptchaIdByRender,
  RecaptchaStateType,
  resetRecaptchaState
} from '../../store';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '3rem'
  }
}));
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
const mapStateToProps = ({ recaptcha }: AppState) => ({
  recaptcha
});
const SignInPage = ({
  recaptcha: { confirmationResult },
  verifyPhoneCode,
  signInWithPhoneProv,
  setCaptchaIdByRender,
}: {
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
          {confirmationResult ? (
            <Box>
              <PhoneVerificationField
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

export const SignInPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);
