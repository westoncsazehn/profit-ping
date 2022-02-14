import {
  FormLabel,
  styled,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
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
export const StyledVerifyWrapper = styled('div')(() => ({
  paddingTop: '25px'
}));

export const PhoneVerificationField = ({
  onPhoneVerification,
  captchaConfirmation
}: {
  onPhoneVerification: any;
  captchaConfirmation: any;
}) => {
  return captchaConfirmation ? (
    <StyledVerifyWrapper>
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
        onChange={onPhoneVerification}
        sx={{ display: 'block' }}
      />
    </StyledVerifyWrapper>
  ) : null;
};
