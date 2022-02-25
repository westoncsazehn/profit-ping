// 3rd party
import React from 'react';
import { Circle } from '@mui/icons-material';
import { IconButton, styled, Typography } from '@mui/material';

export const StyledNumberSpan = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  color: theme.palette.background.paper,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

export const NumberIcon = ({ number }: { number: number }) => {
  return (
    <IconButton>
      <Circle sx={{ height: '75px', width: '75px' }} />
      <StyledNumberSpan>{number}</StyledNumberSpan>
    </IconButton>
  );
};
