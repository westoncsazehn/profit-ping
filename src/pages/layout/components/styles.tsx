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
export const getMenuStyle = (themeMode: string, theme: Theme) => ({
  border: `solid 1px ${theme.palette.grey['500']}`,
  borderRight: 'none',
  borderLeft: 'none',
  boxShadow: 'none',
  color: 'black',
  backgroundColor: `${
    themeMode === 'dark'
      ? theme.palette.common.black
      : theme.palette.common.white
  }`
});
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
export const StyledFooter = styled('div')(({ theme }) => ({
  ...getMenuStyle(theme.palette.mode, theme),
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: 'fit-content',
  padding: 2,
}));
export const StyledSpacerDiv = styled('div')(() => ({
  height: '100px'
}));