// 3rd party
import React from 'react';
import { Button, IconButton, styled, TextField, Tooltip } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export const StyledPhoneActionButtons = styled(Button)(({ theme }) => ({
  width: '100px',
  float: 'right',
  height: '50px',
  [theme.breakpoints.up('md')]: {
    transform: 'translateY(27px)',
    marginLeft: ' 13px'
  }
}));
export const StyledEditIconButton = styled(IconButton)(() => ({
  display: 'inline-block',
  height: 40,
  width: 40,
  flexDirection: 'column',
  alignSelf: 'center',
  marginTop: '10px',
  marginLeft: '10px'
}));
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
export const StyledVerifyTextField = styled(TextField)(({ theme }) => ({
  display: 'block',
  width: '225px',
  paddingBottom: '15px',
  '.MuiOutlinedInput-root': {width: '100%'},
  [theme.breakpoints.up('md')]: {
    paddingBottom: 'unset'
  }
}));
export const StyledVerifyButton = styled(Button)(({ theme }) => ({
  width: '100px',
  height: '50px',
  [theme.breakpoints.up('md')]: {
    marginTop: '27px',
    marginLeft: '27px'
  }
}));
