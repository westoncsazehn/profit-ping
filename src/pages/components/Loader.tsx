import React from 'react';
import { styled } from '@mui/material';

const StyledContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: '999',
  backgroundColor: 'black',
  opacity: '0.9',
  width: '100vw',
  height: '100vh'
}));
const StyledImageContainer = styled('span')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: 'bold'
}));

export const Loader = ({ isLoading }: { isLoading: boolean }) =>
  isLoading ? (
    <StyledContainer>
      <StyledImageContainer>image here</StyledImageContainer>
    </StyledContainer>
  ) : null;
