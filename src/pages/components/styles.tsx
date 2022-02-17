// 3rd party
import { styled } from '@mui/material';

export const StyledContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: '999',
  backgroundColor: 'black',
  width: '100%',
  height: '100%'
}));
export const StyledImageContainer = styled('span')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: 'bold'
}));
