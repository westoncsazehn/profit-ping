// 3rd party
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// local imports
import {
  AddCoinPageRx,
  LayoutRx,
  Loader,
  PortfolioPageRx,
  SignInPageRx,
  SettingsPageRx
} from './pages';
import { AppState, FBUser, signInUser } from './store';
import { auth, UserContext } from './api';
import { ADD_COIN_URL, SETTINGS_URL } from './pages/common';

const mapStateToProps = ({ user, loader }: AppState) => ({
  user,
  loader
});
// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => ({
  signInUser: () => dispatch(signInUser())
});
const App = ({
  signInUser,
  loader: { isLoading }
}: { signInUser: any } & Pick<AppState, 'loader'>) => {
  const [user, setUser] = useState<FBUser | null>(
    JSON.parse(String(sessionStorage.getItem('user'))) as FBUser
  );

  onAuthStateChanged(auth, (user) => {
    const sessionUser = sessionStorage.getItem('user');
    if (user && !sessionUser) {
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } else if (!user) {
      sessionStorage.removeItem('user');
      setUser(null);
    }
  });

  const baseUrlContent = Boolean(user) ? (
    <PortfolioPageRx />
  ) : (
    <SignInPageRx onSignIn={signInUser} />
  );

  return (
    <UserContext.Provider value={user}>
      <Loader isLoading={isLoading} />
      <BrowserRouter>
        <LayoutRx>
          <Routes>
            <Route path="/" element={baseUrlContent} />
            <Route path={`/${ADD_COIN_URL}`} element={<AddCoinPageRx />} />
            <Route path={`/${ADD_COIN_URL}/:id`} element={<AddCoinPageRx />} />
            <Route path={`/${SETTINGS_URL}`} element={<SettingsPageRx />} />
            <Route path="*" element={baseUrlContent} />
          </Routes>
        </LayoutRx>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
