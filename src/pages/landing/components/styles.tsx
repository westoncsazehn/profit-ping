import { Button, Stack, styled } from "@mui/material";

export const StyledImage = styled('img')(() => ({
  height: 'auto',
  width: '100%',
  borderRadius: '5px',
  verticalAlign: 'middle'
}));
export const StyledIntroTextContainerRel = styled('div')(() => ({
  position: 'relative',
  height: '100%',
  width: '100%'
}));
export const StyledIntroTextContainerAbs = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '0.8rem'
  }
}));
export const StyledStack = styled(Stack)(({ theme }) => ({
  mx: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    margin: '0 !important'
  }
}));
export const StyledFAQButton = styled(Button)(() => ({
  float: 'right',
  marginTop: '25px'
}));