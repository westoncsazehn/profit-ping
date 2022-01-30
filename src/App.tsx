// 3rd party libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
// local imports
import { LayoutRx, Loader, SignInPageRx } from './pages';
import { AppState, FBUser, signInUser } from './store';
import { auth, UserContext } from './api';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => ({
  signInUser: () => dispatch(signInUser())
});
const mapStateToProps = ({ user, loader }: AppState) => ({
  user,
  loader
});
const App = ({
  signInUser,
  loader: { isLoading }
}: { signInUser: any } & Pick<AppState, 'loader'>) => {
  const [user, setUser] = useState<FBUser>();

  onAuthStateChanged(auth, (user) => (user ? setUser(user) : false));

  return (
    <>
      <Loader isLoading={isLoading} />
      {user ? (
        <UserContext.Provider value={user}>
          <LayoutRx />
        </UserContext.Provider>
      ) : (
        <SignInPageRx onSignIn={signInUser} />
      )}
    </>
  );
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
