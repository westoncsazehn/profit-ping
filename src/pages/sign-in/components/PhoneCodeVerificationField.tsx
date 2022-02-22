import { FormLabel, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TOOLTIP_COMMON_PROPS } from '../../portfolio/components/PortfolioTable/styles';
import {
  StyledHelpOutline,
  StyledTooltip,
  StyledVerifyButton,
  StyledVerifyTextField
} from './styles';

const MAX_VERIFICATION_CODE_LENGTH: number = 6;

export const PhoneCodeVerificationField = ({
  onPhoneVerification,
  captchaConfirmation,
  recaptchaVerifier
}: {
  onPhoneVerification: any;
  captchaConfirmation: any;
  recaptchaVerifier: any;
}) => {
  const [isVerifyDisabled, setIsVerifyDisabled] = useState<boolean>(true);
  const [verifyCode, setVerifyCode] = useState<number | undefined>();
  return Boolean(captchaConfirmation && recaptchaVerifier) ? (
    <Grid container sx={{ paddingTop: '25px' }}>
      <Grid item xs={12} md={3}>
        <FormLabel htmlFor="verification-code">Verification Code</FormLabel>
        <StyledTooltip
          title={
            <Typography>
              Enter the verification code sent to your phone number via sms.
            </Typography>
          }
          {...TOOLTIP_COMMON_PROPS}>
          <StyledHelpOutline />
        </StyledTooltip>
        <StyledVerifyTextField
          id="verification-code"
          inputProps={{ maxLength: 6 }}
          onChange={(e) => {
            setIsVerifyDisabled(
              e.target.value.length < MAX_VERIFICATION_CODE_LENGTH
            );
            setVerifyCode(Number(e.target.value));
          }}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <StyledVerifyButton
          onClick={() => onPhoneVerification(verifyCode)}
          disabled={isVerifyDisabled}
          variant="contained"
          color="primary">
          Verify
        </StyledVerifyButton>
      </Grid>
    </Grid>
  ) : null;
};
