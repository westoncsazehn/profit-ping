// 3rd party libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
// local imports
import { Layout } from './pages';
import { AppState, FBUser, setUser, signInUser } from './store';
import { auth } from './api';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    signInUser: () => dispatch(signInUser()),
    setUser: (user: FBUser) => dispatch(setUser(user))
  };
};
const mapStateToProps = ({ user }: AppState) => user;
export const App = (props: FBUser & any) => {
  const { signInUser } = props;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean());

  useEffect(() => {
    onAuthStateChanged(auth, (fbUser: any) => {
      setIsLoggedIn(Boolean(fbUser));
      setUser(fbUser);
    });
  }, []);

  if (isLoggedIn) {
    return <Layout />;
  } else {
    return <button onClick={signInUser}> Sign In</button>;
  }
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
