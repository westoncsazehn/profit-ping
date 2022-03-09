// 3rd party
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';
// local
import { DisplayAlert } from '../components';
import { getPageTitle } from './util';
import {
  AccountMenu,
  DarkLightModeButton,
  getMenuStyle,
  StyledToolBar,
  StyledLogoButton,
  StyledImageLogo,
  StyledFooter,
  StyledSpacerDiv,
  StyledBrainfishLink
} from './components';
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
  SETTINGS_URL
} from '../common';

const BRAINFISH_LINK: string = 'https://brainfish.io';
const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(signOut()),
  resetAlert: () => dispatch(resetAlert()),
  navigateTo: (path: string) => dispatch(navigateTo(path))
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
  resetAlert,
  navigateTo
}: {
  displayAlert: DisplayAlertType;
  signOut: any;
  resetAlert: any;
  navigateTo: any;
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
    navigate(`/${path}`);
    window?.scrollTo(0, 0);
  }, [navigate, path]);
  // if there is alert data available, then trigger initAlert()
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        resetAlert({ open: false, message: '', severity: undefined });
      }, DISPLAY_ALERT_TIMEOUT);
    }
  }, [open]);
  // on page change, get pathname, then set page title
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
    navigateTo(SETTINGS_URL);
  };
  const onFAQClick = () => navigateTo(FAQ_URL);

  return (
    <>
      <AppBar position="static" sx={getMenuStyle(themeMode, theme)}>
        <Container maxWidth="xl" sx={{ p: 0 }}>
          <StyledToolBar sx={{ p: 0 }}>
            <Box sx={{ flexGrow: 1 }}>
              <StyledLogoButton onClick={() => navigateTo(homeLink)}>
                <StyledImageLogo alt="Profit Ping Logo" src={appBarLogoImg} />
              </StyledLogoButton>
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
        {open && message && severity ? (
          <DisplayAlert {...{ open, message, severity }} />
        ) : null}
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
      {children}
      <StyledSpacerDiv />
      <StyledFooter>
        <Container>
          <Stack
            direction="row"
            sx={{ margin: '0 auto', width: 'fit-content' }}>
            <Button onClick={onFAQClick}>FAQ</Button>
            <StyledBrainfishLink
              href={BRAINFISH_LINK}
              target="_blank"
              rel="noreferrer">
              Brainfish LLC
            </StyledBrainfishLink>
          </Stack>
        </Container>
      </StyledFooter>
    </>
  );
};
export const LayoutRx = connect(mapStateToProps, mapDispatchToProps)(Layout);
