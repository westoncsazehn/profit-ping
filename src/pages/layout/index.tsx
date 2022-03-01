// 3rd party
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
import { connect } from 'react-redux';
// local
import {
  AppState,
  DISPLAY_ALERT_TIMEOUT,
  DisplayAlertType,
  FBUser,
  NavigateStateType,
  navigateTo,
  resetAlert,
  signOut
} from '../../store';
import {
  BASE_URL,
  FAQ_URL,
  PORTFOLIO_URL,
  PROFIT_PING_LOGO_PATH_DARK_MODE,
  PROFIT_PING_LOGO_PATH_LIGHT_MODE,
  SETTINGS_URL,
  SIGN_IN_URL
} from '../common';
import { DisplayAlert } from '../components';
import {
  AccountMenu,
  DarkLightModeButton,
  getMenuStyle,
  StyledToolBar,
  StyledLink,
  StyledImageLogo,
  StyledFooter,
  StyledSpacerDiv
} from './components';
import { getPageTitle } from './util';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(signOut()),
  resetAlert: () => dispatch(resetAlert())
});
const mapStateToProps = ({ displayAlert, navigate, user }: AppState) => ({
  user,
  displayAlert,
  navigate
});
export const Layout = ({
  displayAlert: { open, message, severity },
  signOut,
  children,
  navigate: { path },
  user,
  resetAlert
}: {
  displayAlert: DisplayAlertType;
  signOut: any;
  resetAlert: any;
  children: React.ReactNode;
  navigate: NavigateStateType;
  user: FBUser;
}) => {
  const { uid } = user;
  const theme = useTheme();
  const navigate = useNavigate();
  const [page, setPage] = useState<string>('');
  const [menuElement, setMenuElement] = useState(null);
  const { pathname = '' } = useLocation();
  const isLoggedIn: boolean = Boolean(uid);
  const isMenuOpen = Boolean(menuElement);
  const homeLink: string = uid ? PORTFOLIO_URL : BASE_URL;
  const themeMode = theme.palette.mode;
  const appBarLogoImg: string =
    themeMode === 'light'
      ? PROFIT_PING_LOGO_PATH_LIGHT_MODE
      : PROFIT_PING_LOGO_PATH_DARK_MODE;

  // on path change request from navigate saga
  useEffect(() => {
    const newPath: string =
      !uid && !path
        ? `/${SIGN_IN_URL}`
        : !path
        ? `/${PORTFOLIO_URL}`
        : `/${path}`;
    navigate(newPath)
  }, [`/${path}`]);
  // if there is alert data available, then trigger initAlert()
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        resetAlert({ open: false, message: '', severity: undefined });
      }, DISPLAY_ALERT_TIMEOUT);
    }
  }, [open]);
  // on page change, get path, then set page title
  useEffect(
    () => setPage(getPageTitle(pathname, isLoggedIn)),
    [isLoggedIn, pathname]
  );

  // handlers
  const handleClick = (event: any) => {
    setMenuElement(event.currentTarget);
  };
  const handleClose = () => {
    setMenuElement(null);
  };
  const onSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClose();
    signOut();
  };
  const onInitSettings = () => {
    setMenuElement(null);
    navigate(SETTINGS_URL);
  };
  const onFAQClick = () => navigate(FAQ_URL);

  return (
    <>
      <AppBar position="static" sx={getMenuStyle(themeMode, theme)}>
        <Container maxWidth="xl" sx={{ p: 0 }}>
          <StyledToolBar sx={{ p: 0 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Button variant="text">
                <StyledLink to={homeLink}>
                  <StyledImageLogo alt="Profit Ping Logo" src={appBarLogoImg} />
                </StyledLink>
              </Button>
            </Box>
            <AccountMenu
              {...{
                isLoggedIn,
                user,
                menuElement,
                isMenuOpen,
                handleClick,
                handleClose,
                onSignOut,
                onInitSettings
              }}
            />
          </StyledToolBar>
        </Container>
      </AppBar>
      <Container>
        {page ? (
          <Toolbar sx={{ padding: '0px !important' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{page}</Typography>
            </Box>
            {isLoggedIn ? <DarkLightModeButton /> : null}
          </Toolbar>
        ) : null}
      </Container>
      {open && message && severity ? (
        <DisplayAlert {...{ open, message, severity }} />
      ) : null}
      {children}
      <StyledSpacerDiv />
      <StyledFooter>
        <Container>
          <Stack
            direction="row"
            sx={{ margin: '0 auto', width: 'fit-content' }}>
            <Button>About Us</Button>
            <Button onClick={onFAQClick}>FAQ</Button>
          </Stack>
        </Container>
      </StyledFooter>
    </>
  );
};
export const LayoutRx = connect(mapStateToProps, mapDispatchToProps)(Layout);
