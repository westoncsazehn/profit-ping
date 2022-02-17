import {
  Button,
  FormLabel,
  styled,
  TextField,
  Tooltip,
  Grid,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { TOOLTIP_COMMON_PROPS } from '../../portfolio/components/PortfolioTable/styles';
import { HelpOutline } from '@mui/icons-material';
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export const StyledHelpOutline = styled(HelpOutline)(() => ({
  fontSize: '0.75rem',
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: '2px !important',
  marginTop: '3px !important'
}));
export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black
  }
}));
const MAX_VERIFICATION_CODE_LENGTH: number = 6;

export const PhoneVerificationField = ({
  onPhoneVerification,
  captchaConfirmation
}: {
  onPhoneVerification: any;
  captchaConfirmation: any;
}) => {
  const [isVerifyDisabled, setIsVerifyDisabled] = useState<boolean>(true);
  const [verifyCode, setVerifyCode] = useState<number | undefined>();
  return captchaConfirmation ? (
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
        <TextField
          id="verification-code"
          onChange={(e) => {
            setIsVerifyDisabled(
              e.target.value.length < MAX_VERIFICATION_CODE_LENGTH
            );
            setVerifyCode(Number(e.target.value));
          }}
          sx={{ display: 'block' }}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Button
          onClick={() => onPhoneVerification(verifyCode)}
          disabled={isVerifyDisabled}
          variant="contained"
          color="primary"
          sx={{ height: '56px', marginTop: '23px' }}>
          Verify
        </Button>
      </Grid>
    </Grid>
  ) : null;
};
