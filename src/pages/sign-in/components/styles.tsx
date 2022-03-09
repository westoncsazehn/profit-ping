// 3rd party
import React from 'react';
import {
  Button,
  FormControl,
  IconButton,
  styled,
  TextField,
  Tooltip
} from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export const StyledPhoneActionButtons = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '50px',
  [theme.breakpoints.up('md')]: {
    width: '100px',
    transform: 'translateY(27px)',
    marginLeft: ' 13px',
    float: 'left'
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
  width: '100%',
  paddingBottom: '15px',
  '.MuiOutlinedInput-root': { width: '100%' },
  [theme.breakpoints.up('md')]: {
    paddingBottom: 'unset',
    paddingRight: '50px'
  }
}));
export const StyledVerifyButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '50px',
  [theme.breakpoints.up('md')]: {
    width: 'unset',
    marginTop: '27px',
    marginLeft: '13px'
  }
}));
export const StyledPhoneFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  paddingBottom: '15px',
  [theme.breakpoints.up('md')]: {
    width: 'unset'
  }
}));
export const StyledPhoneInputField = styled(TextField)(({ theme }) => ({
  input: {}
}));
