// 3rd party
import React, { lazy, useEffect } from 'react';
import { connect } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// local imports
import { LayoutRx, Loader } from './pages';
import {
  AppState,
  FBUser,
  LoaderState,
  NavigateStateType,
  setUser
} from './store';
import {
  ADD_COIN_URL,
  FAQ_URL,
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
const PortfolioPage = lazy(() => import('./pages/portfolio/index'));
const AddCoinPage = lazy(() => import('./pages/add-coin/index'));
const SettingsPage = lazy(() => import('./pages/settings/index'));
const SignInPage = lazy(() => import('./pages/sign-in/index'));
const LandingPage = lazy(() => import('./pages/landing/index'));
const FAQPage = lazy(() => import('./pages/faq/index'));
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
            <Route
              path="/"
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <LandingPage />
                </React.Suspense>
              }
            />
            <Route
              path={`/${PORTFOLIO_URL}`}
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <PortfolioPage />
                </React.Suspense>
              }
            />
            <Route
              path={`/${ADD_COIN_URL}`}
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <AddCoinPage />
                </React.Suspense>
              }
            />
            <Route
              path={`/${ADD_COIN_URL}/:id`}
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <AddCoinPage />
                </React.Suspense>
              }
            />
            <Route
              path={`/${SETTINGS_URL}`}
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <SettingsPage />
                </React.Suspense>
              }
            />
            <Route
              path={`/${SIGN_IN_URL}`}
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <SignInPage />
                </React.Suspense>
              }
            />
            <Route
              path={`/${FAQ_URL}`}
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <FAQPage />
                </React.Suspense>
              }
            />
            <Route
              path="*"
              element={
                <React.Suspense fallback={<Loader isLoading />}>
                  <LandingPage />
                </React.Suspense>
              }
            />
          </Routes>
        </LayoutRx>
      </BrowserRouter>
    </>
  );
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
