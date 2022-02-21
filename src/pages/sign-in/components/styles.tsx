import { Button, Paper, Stack, styled, Tooltip } from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
import { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import React from "react";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '3rem'
  }
}));
export const StyledPhoneActionButtons = styled(Button)(({ theme }) => ({
  height: '2.5rem',
  width: '100px',
  float: 'right'
}));
export const StyledActionButtonsStack = styled(Stack)(({ theme }) => ({
  'button:last-child': { marginRight: '10px' },
  padding: '25px 0 0 0 ',
  [theme.breakpoints.up('md')]: {
    transform: 'translateY(75%)',
    padding: 'unset',
    paddingLeft: '50px'
  }
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