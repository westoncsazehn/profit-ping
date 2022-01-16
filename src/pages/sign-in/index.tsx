import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { connect } from 'react-redux';
import { auth, provider } from '../../api';
import { signInUser } from '../../store';

const mapDispatchToProps = (dispatch: any) => {
  return {
    signInUser: () => dispatch(signInUser())
  };
};
export const SignInPage = (props: any) => {
  return <></>;
};

export const SignInPageRx = connect(null, mapDispatchToProps)(SignInPage);
