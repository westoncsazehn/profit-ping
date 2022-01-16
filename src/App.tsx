import React from 'react';
import { connect } from 'react-redux';
import { Layout } from './pages';
import { AppState, FBUser, signInUser } from './store';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    signInUser: () => dispatch(signInUser())
  };
};
const mapStateToProps = ({ user }: AppState) => user;
export const App = ({ user, signInUser }: FBUser & any) => {
  if (user?.email) {
    return <Layout />;
  } else {
    return <button onClick={signInUser}> Sign In</button>;
  }
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
