// 3rd party
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { signOut } from 'firebase/auth';
// local
import { auth, UserContext } from '../../api';
import { CoinPage } from '../coin';
import { PortfolioPageRx } from '../portfolio';
import { FBUser } from '../../store';
import {
  AppBar,
  Avatar,
  Box,
  CardHeader,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography
} from '@mui/material';
import { SignInPage } from '../sign-in';

const menuStyle = {
  backgroundColor: 'white',
  border: 'solid 1px black',
  borderRight: 'none',
  borderLeft: 'none',
  boxShadow: 'none',
  color: 'black'
};

export const Layout = () => {
  const user = useContext<FBUser>(UserContext);
  const { pathname = '' } = window?.location;
  const [page, setPage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(user?.email));

  useEffect(
    () =>
      setPage(
        pathname === 'login'
          ? 'Login'
          : pathname.includes('coin')
          ? 'Add Coin'
          : isLoggedIn
          ? 'Portfolio'
          : 'Sign In'
      ),
    [pathname]
  );

  return (
    <>
      {isLoggedIn ? (
        <>
          <AppBar position="static" sx={menuStyle}>
            <Container maxWidth="xl">
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" noWrap component="div">
                    PROFIT PING
                  </Typography>
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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <PortfolioPageRx /> : <SignInPage />}
          />
          <Route path="/coin" element={<CoinPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
