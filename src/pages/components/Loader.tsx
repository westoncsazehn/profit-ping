// 3rd party
import React from 'react';
import { StyledContainer, StyledImageContainer } from './styles';

const LOADER_LOGO_IMG_PATH: string = 'profit-ping-logo-white-large.png';
export const Loader = ({ isLoading }: { isLoading: boolean }) =>
  isLoading ? (
    <StyledContainer>
      <StyledImageContainer>
        <img src={LOADER_LOGO_IMG_PATH} width={100} alt="Profit Ping Logo" />
      </StyledImageContainer>
    </StyledContainer>
  ) : null;
