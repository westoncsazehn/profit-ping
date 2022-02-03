// 3rd party
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { AppState, DisplayAlertType, FBUser, initAlert } from '../../store';
import { ADD_COIN_URL, LOGIN_URL } from '../common/values';
import { DisplayAlert } from '../components';

const menuStyle = {
  backgroundColor: 'white',
  border: 'solid 1px black',
  borderRight: 'none',
  borderLeft: 'none',
  boxShadow: 'none',
  color: 'black'
};
const StyledImageLogo = styled('img')(() => ({
  width: '100px',
  verticalAlign: 'middle'
}));
const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'black'
}));
const PROFIT_PING_LOGO_PATH: string = 'profit-ping-logo-small.png';
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
  const isLoggedIn: boolean = Boolean(user?.uid);
  const { pathname = '' } = useLocation();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        initAlert({ open: false });
      }, 5000);
    }
  }, [open]);

  useEffect(() => {
    let currenPath: string = '';
    const path: string = pathname.replace(/\//g, '');
    switch (path) {
      case LOGIN_URL:
        currenPath = 'LOGIN';
        break;
      case ADD_COIN_URL:
        currenPath = 'ADD COIN';
        break;
      default:
        currenPath = isLoggedIn ? 'PORTFOLIO' : 'SIGN IN';
        break;
    }
    setPage(currenPath);
  }, [isLoggedIn, pathname]);

  return (
    <>
      <AppBar position="static" sx={menuStyle}>
        <Container maxWidth="xl">
          <Toolbar>
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
            <Box sx={{ flexGrow: 0 }}>
              <CardHeader
                sx={{
                  p: 0,
                  flexDirection: 'row-reverse',
                  '.MuiCardHeader-avatar': { marginRight: 'unset' },
                  display: isLoggedIn ? 'flex' : 'none'
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
            <Typography variant="h6">{page}</Typography>
          </Box>
          <Box sx={{ flexGrow: 0, float: 'right' }}>
            <FormGroup>
              <FormControlLabel
                value="end"
                control={<Switch color="primary" size="small" />}
                label={isLoggedIn ? 'Logout' : 'Login'}
                labelPlacement="end"
                onChange={async () => {
                  await signOut(auth);
                }}
                checked={isLoggedIn}
                sx={{
                  span: { fontSize: '0.8rem' },
                  display: isLoggedIn ? 'inherit' : 'none'
                }}
              />
            </FormGroup>
          </Box>
        </Toolbar>
      </Container>
      <DisplayAlert {...{ open, message, severity }} />
      {children}
    </>
  );
};
export const LayoutRx = connect(mapStateToProps, mapDispatchToProps)(Layout);
