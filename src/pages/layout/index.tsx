// 3rd party
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CardHeader,
  Container,
  FormControlLabel,
  FormGroup,
  styled,
  Switch,
  Toolbar,
  Typography
} from '@mui/material';
import { connect } from 'react-redux';
// local
import { auth, UserContext } from '../../api';
import { AddCoinPageRx } from '../add-coin';
import { PortfolioPageRx } from '../portfolio';
import {
  AppState,
  DisplayAlertType,
  FBUser,
  initAlert,
  signInUser
} from '../../store';
import { SignInPageRx } from '../sign-in';
import { ADD_COIN_URL, LOGIN_URL } from '../meta-data/urls';
import { DisplayAlert } from '../components';

const menuStyle = {
  backgroundColor: 'white',
  border: 'solid 1px black',
  borderRight: 'none',
  borderLeft: 'none',
  boxShadow: 'none',
  color: 'black'
};
const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'black'
}));
// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => ({
  signInUser: () => dispatch(signInUser()),
  initAlert: (alert: DisplayAlertType) => dispatch(initAlert(alert))
});
const mapStateToProps = ({ displayAlert }: AppState) => ({ displayAlert });
export const Layout = ({
  signInUser,
  displayAlert: { open, message, severity },
  initAlert
}: {
  signInUser: any;
  displayAlert: DisplayAlertType;
  initAlert: any;
}) => {
  const user = useContext<FBUser>(UserContext);
  const { pathname = '' } = window?.location;
  const [page, setPage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(user?.email));

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        initAlert({ open: false });
      }, 5000);
    }
  }, [open]);

  useEffect(() => {
    setPage(
      pathname === LOGIN_URL
        ? 'Login'
        : pathname.includes(ADD_COIN_URL)
        ? 'Add Coin'
        : isLoggedIn
        ? 'Portfolio'
        : 'Sign In'
    );
  }, [pathname]);

  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? (
          <>
            <AppBar position="static" sx={menuStyle}>
              <Container maxWidth="xl">
                <Toolbar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Button variant="text">
                      <StyledLink to="/">PROFIT PING</StyledLink>
                    </Button>
                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                    <CardHeader
                      sx={{
                        p: 0,
                        flexDirection: 'row-reverse',
                        '.MuiCardHeader-avatar': { marginRight: 'unset' }
                      }}
                      title={`Welcome${user ? ' ' + user.displayName : ''}!`}
                      titleTypographyProps={{
                        paddingRight: '10px'
                      }}
                      avatar={
                        <Avatar
                          alt={user?.displayName || ''}
                          src={user?.photoURL || ''}
                          sx={{
                            display: 'relative',
                            float: 'right'
                          }}
                        />
                      }
                    />
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            <Container>
              <Toolbar sx={{ padding: '0px !important' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">/ {page}</Typography>
                </Box>
                <Box sx={{ flexGrow: 0, float: 'right' }}>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={<Switch color="primary" size="small" />}
                      label={isLoggedIn ? 'Logout' : 'Login'}
                      labelPlacement="end"
                      onChange={async () => {
                        setIsLoggedIn(false);
                        await signOut(auth);
                      }}
                      checked={isLoggedIn}
                      sx={{
                        span: { fontSize: '0.8rem' }
                      }}
                    />
                  </FormGroup>
                </Box>
              </Toolbar>
            </Container>
          </>
        ) : null}
        <DisplayAlert {...{ open, message, severity }} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <PortfolioPageRx />
              ) : (
                <SignInPageRx onSignIn={signInUser} />
              )
            }
          />
          <Route path={`/${ADD_COIN_URL}`} element={<AddCoinPageRx />} />
          <Route path={`/${ADD_COIN_URL}/:id`} element={<AddCoinPageRx />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export const LayoutRx = connect(mapStateToProps, mapDispatchToProps)(Layout);
