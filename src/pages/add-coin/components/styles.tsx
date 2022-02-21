import { Button, FormControl, Paper, styled, Typography } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '3rem'
  }
}));
export const StyledFormTitleDescription = styled(Typography)(({ theme }) => ({
  margin: '15px 0',
  [theme.breakpoints.up('md')]: { marginBottom: '50px' }
}));
export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  paddingBottom: '1.25rem',
  [theme.breakpoints.up('md')]: {
    paddingBottom: '3rem'
  }
}));
export const StyledHelpOutline = styled(HelpOutline)(() => ({
  fontSize: '0.75rem',
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: '2px !important',
  marginTop: '3px !important'
}));
export const StyledFormButtons = styled(Button)(({ theme }) => ({
  height: '2.5rem',
  width: '100px',
  float: 'right',
  marginTop: '15px'
}));
