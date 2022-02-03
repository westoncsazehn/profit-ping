// 3rd party
import React from 'react';
import { styled } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { HelpOutline } from '@mui/icons-material';

export const TOOLTIP_COMMON_PROPS: Pick<TooltipProps, 'placement' | 'arrow'> = {
  placement: 'top',
  arrow: true
};
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
export const StyledWarningTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'red'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'red'
  }
}));
export const StyledTooltipIcon = styled(HelpOutline)(() => ({
  fontSize: '0.75rem',
  display: 'inline-block',
  paddingLeft: '1px',
  paddingBottom: '2px',
  cursor: 'pointer'
}));
