// 3rd party libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
// local imports
import { Layout, SignInPage } from './pages';
import { AppState, FBUser, signInUser } from './store';
import { auth, UserContext } from './api';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    signInUser: () => dispatch(signInUser())
  };
};
const mapStateToProps = ({ user }: AppState) => user;
export const App = (props: FBUser & any) => {
  const { signInUser } = props;
  const [user, setUser] = useState<FBUser>();

  onAuthStateChanged(auth, (user) => (user ? setUser(user) : false));

  return user ? (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  ) : (
    <SignInPage onSignIn={signInUser} />
  );
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
