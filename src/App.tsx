// 3rd party
import React, { useEffect } from 'react';
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
import {
  AppState,
  FBUser,
  LoaderState,
  NavigateStateType,
  setUser
} from './store';
import {
  ADD_COIN_URL,
  PORTFOLIO_URL,
  SETTINGS_URL,
  SIGN_IN_URL
} from './pages/common';
import { auth } from './api';

const mapStateToProps = ({
  loader,
  navigate
}: AppState): {
  loader: LoaderState;
  navigate: NavigateStateType;
} => ({ loader, navigate });
const mapDispatchToProps = (dispatch: any) => ({
  setUser: (user: FBUser) => dispatch(setUser(user))
});
const App = ({
  loader,
  navigate: { path },
  setUser
}: {
  loader: LoaderState;
  navigate: NavigateStateType;
  setUser: any;
}) => {
  const isLoading: boolean = Boolean(loader?.isLoading);

  useEffect(() => {
    return onAuthStateChanged(auth, (fbUser) =>
      setUser({ uid: fbUser?.uid, phoneNumber: fbUser?.phoneNumber })
    );
  }, [path]);

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
