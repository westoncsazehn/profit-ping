// 3rd party
import React from 'react';
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
  SettingsPageRx,
  LandingPage
} from './pages';
import { AppState, FBUser, LoaderState, setUser } from './store';
import { auth } from './api';
import {
  ADD_COIN_URL,
  PORTFOLIO_URL,
  SETTINGS_URL,
  SIGN_IN_URL
} from './pages/common';

const mapStateToProps = ({
  loader,
  user
}: AppState): {
  loader: LoaderState;
  user: FBUser;
} => ({ loader, user });
const mapDispatchToProps = (dispatch: any) => ({
  setUser: (user: FBUser) => dispatch(setUser(user))
});
const App = ({
  loader,
  user,
  setUser
}: Partial<AppState> & { setUser: any }) => {
  const isLoading: boolean = Boolean(loader?.isLoading);
  const uid = String(user?.uid);
  // @ts-ignore
  const persist = JSON.parse(localStorage.getItem('persist:root'));
  const localUser = JSON.parse(persist.user);

  onAuthStateChanged(auth, (fbUser) => {
    if (fbUser?.uid && !uid && !localUser?.uid) {
      setUser({ uid: fbUser.uid, phoneNumber: fbUser.phoneNumber });
    } else if (!fbUser && uid) {
      setUser();
    }
  });

  return (
    <>
      <Loader isLoading={isLoading} />
      <BrowserRouter>
        <LayoutRx>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path={`/${PORTFOLIO_URL}`} element={<PortfolioPageRx />} />
            <Route path={`/${ADD_COIN_URL}`} element={<AddCoinPageRx />} />
            <Route path={`/${ADD_COIN_URL}/:id`} element={<AddCoinPageRx />} />
            <Route path={`/${SETTINGS_URL}`} element={<SettingsPageRx />} />
            <Route path={`/${SIGN_IN_URL}`} element={<SignInPageRx />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </LayoutRx>
      </BrowserRouter>
    </>
  );
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
