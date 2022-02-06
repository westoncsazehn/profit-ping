// 3rd party
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from '@mui/material';
import { connect } from 'react-redux';
// local
import { auth, UserContext } from '../../api';
import { AppState, DisplayAlertType, FBUser, initAlert } from '../../store';
import { PROFIT_PING_LOGO_PATH, SETTINGS_URL } from '../common';
import { DisplayAlert } from '../components';
import {
  AccountMenu,
  menuStyle,
  StyledToolBar,
  StyledLink,
  StyledImageLogo
} from './components';
import { getPageTitle } from './util';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => ({
  initAlert: (alert: DisplayAlertType) => dispatch(initAlert(alert))
});
const mapStateToProps = ({ displayAlert }: AppState) => ({ displayAlert });
export const Layout = ({
  displayAlert: { open, message, severity },
  initAlert,
  children
}: {
  displayAlert: DisplayAlertType;
  initAlert: ({ open }: any) => void;
  children: React.ReactNode;
}) => {
  const user = useContext<FBUser>(UserContext);
  const [page, setPage] = useState<string>('');
  const [menuElement, setMenuElement] = useState(null);
  const { pathname = '' } = useLocation();
  const navigate = useNavigate();
  const isLoggedIn: boolean = Boolean(user?.uid);
  const isMenuOpen = Boolean(menuElement);

  // if there is alert data available, then trigger initAlert()
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        initAlert({ open: false });
      }, 5000);
    }
  }, [open]);
  // on page change, get path, then set page title
  useEffect(
    () => setPage(getPageTitle(pathname, isLoggedIn)),
    [isLoggedIn, pathname]
  );

  const handleClick = (event: any) => {
    setMenuElement(event.currentTarget);
  };
  const handleClose = () => {
    setMenuElement(null);
  };
  const onSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleClose();
    await signOut(auth);
  };
  const onInitSettings = () => navigate(SETTINGS_URL);

  return (
    <>
      <AppBar position="static" sx={menuStyle}>
        <Container maxWidth="xl" sx={{ p: 0 }}>
          <StyledToolBar sx={{ p: 0 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Button variant="text">
                <StyledLink to="/">
                  <StyledImageLogo
                    alt="Profit Ping Logo"
                    src={PROFIT_PING_LOGO_PATH}
                  />
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
        <Toolbar sx={{ padding: '0px !important' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{page}</Typography>
          </Box>
        </Toolbar>
      </Container>
      <DisplayAlert {...{ open, message, severity }} />
      {children}
    </>
  );
};
export const LayoutRx = connect(mapStateToProps, mapDispatchToProps)(Layout);
