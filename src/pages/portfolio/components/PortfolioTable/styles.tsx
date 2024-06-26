// 3rd party
import React from 'react';
import { IconButton, styled, Typography } from '@mui/material';
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
)(({ theme }) => {
  const mode = theme.palette.mode;
  const color = theme.palette.error[mode];
  return {
    [`& .${tooltipClasses.arrow}`]: {
      color
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: color
    }
  };
});
export const StyledRemoveCoinIconButton = styled(IconButton)(() => ({
  '&:hover': {
    color: 'red'
  }
}));
export const StyledTableHeaderTitle = styled(Typography)(() => ({
  display: 'inline-block',
  fontWeight: '500',
  width: 'max-content'
}));
export const StyledTooltipIcon = styled(HelpOutline)(() => ({
  fontSize: '0.75rem',
  display: 'inline-block',
  paddingLeft: '1px',
  paddingBottom: '2px',
  cursor: 'pointer'
}));
export const StyledLabelContentSpan = styled('span')(() => ({
  width: 'max-content',
  display: 'flex'
}));
// table coin formatting styles
export const StyledTypography = styled(Typography)(() => ({
  display: 'inline-block'
}));
export const StyledDividerTypography = styled('span')(() => ({
  padding: '0 5px',
  display: 'inline-block'
}));
