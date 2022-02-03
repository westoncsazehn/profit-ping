// 3rd party
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// local
import { AppState } from '../../store';
import { LOGIN_URL } from '../common/values';

const mapStateToProps = ({ loader }: AppState) => ({ loader });
const SignInPage = ({ onSignIn }: { onSignIn: any }) => {
  const navigate = useNavigate();
  const { pathname = '' } = useLocation();
  // for 404 cases, reload with correct path
  useEffect(() => {
    if (pathname !== LOGIN_URL) {
      navigate(LOGIN_URL);
    }
  }, [pathname]);
  return (
    <>
      <Button onClick={onSignIn}>SIGN IN</Button>
    </>
  );
};

export const SignInPageRx = connect(mapStateToProps, null)(SignInPage);
