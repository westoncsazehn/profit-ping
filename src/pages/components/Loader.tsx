// 3rd party
import React from 'react';
import { styled } from '@mui/material';

const StyledContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: '999',
  backgroundColor: 'black',
  opacity: '0.9',
  width: '100%',
  height: '100%'
}));
const StyledImageContainer = styled('span')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: 'bold'
}));
const LOADER_LOGO_IMG_PATH: string = 'profit-ping-logo-white-large.png';
export const Loader = ({ isLoading }: { isLoading: boolean }) =>
  isLoading ? (
    <StyledContainer>
      <StyledImageContainer>
        <img src={LOADER_LOGO_IMG_PATH} width={100} alt="Profit Ping Logo" />
      </StyledImageContainer>
    </StyledContainer>
  ) : null;
