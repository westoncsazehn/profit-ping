// 3rd party
import React from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
// local
import { AppState } from '../../store';

const mapStateToProps = ({ loader }: AppState) => ({ loader });
const SignInPage = ({ onSignIn }: { onSignIn: any }) => {
  return (
    <>
      <Button onClick={onSignIn}>LOG IN</Button>
    </>
  );
};

export const SignInPageRx = connect(mapStateToProps, null)(SignInPage);
