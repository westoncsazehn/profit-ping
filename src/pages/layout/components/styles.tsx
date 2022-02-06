// 3rd party
import { styled, SxProps, Theme, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export const getCardHeaderStyles = (
  isLoggedIn: boolean
): SxProps<Theme> | undefined => ({
  p: 0,
  flexDirection: 'row-reverse',
  '.MuiCardHeader-avatar': { marginRight: 'unset' },
  display: isLoggedIn ? 'flex' : 'none'
});
export const ToolbarMenuPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0
    }
  }
};
export const menuStyle = {
  backgroundColor: 'white',
  border: 'solid 1px black',
  borderRight: 'none',
  borderLeft: 'none',
  boxShadow: 'none',
  color: 'black'
};
export const StyledImageLogo = styled('img')(() => ({
  width: '100px',
  verticalAlign: 'middle'
}));
export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'black'
}));
export const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  padding: '0'
}));
