// 3rd party
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import React, { lazy, useEffect } from 'react';
import { connect } from 'react-redux';
// local imports
import { LayoutRx, Loader } from './pages';
import { auth } from './api';
import {
  AppState,
  FBUser,
  LoaderState,
  NavigateStateType,
  PaypalStateType,
  getPaypalConfig,
  setUser
} from './store';
import {
  ADD_COIN_URL,
  FAQ_URL,
  PLAN_URL,
  PORTFOLIO_URL,
  SETTINGS_URL,
  SIGN_IN_URL
} from './pages/common';

const mapStateToProps = ({
  loader,
  navigate,
  paypal
}: AppState): {
  loader: LoaderState;
  navigate: NavigateStateType;
  paypal: PaypalStateType;
} => ({ loader, navigate, paypal });
const mapDispatchToProps = (dispatch: any) => ({
  setUser: (user: FBUser) => dispatch(setUser(user)),
  getPaypalConfig: () => dispatch(getPaypalConfig())
});
const PortfolioPage = lazy(() => import('./pages/portfolio/index'));
const AddCoinPage = lazy(() => import('./pages/add-coin/index'));
const SettingsPage = lazy(() => import('./pages/settings/index'));
const SignInPage = lazy(() => import('./pages/sign-in/index'));
const LandingPage = lazy(() => import('./pages/landing/index'));
const FAQPage = lazy(() => import('./pages/faq/index'));
const PlanPage = lazy(() => import('./pages/plan/index'));
const App = ({
  loader,
  navigate: { path },
  paypal: {
    'client-id': clientID,
    intent,
    locale,
    vault,
    currency,
    createSubscription,
    isDeferred
  },
  setUser,
  getPaypalConfig
}: {
  loader: LoaderState;
  navigate: NavigateStateType;
  paypal: PaypalStateType;
  setUser: any;
  getPaypalConfig: any;
}) => {
  const isLoading: boolean = Boolean(loader?.isLoading);
  const paypalOptions = {
    'client-id': clientID,
    components: 'buttons',
    intent,
    locale,
    vault,
    currency,
    createSubscription
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (fbUser) =>
      setUser({ uid: fbUser?.uid, phoneNumber: fbUser?.phoneNumber })
    );
  }, [path]);
  // PayPal > get plan id and client id, then update config in store
  useEffect(() => getPaypalConfig(), []);

  return (
    <>
      <PayPalScriptProvider options={paypalOptions} deferLoading={isDeferred}>
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
                path={`/${PLAN_URL}`}
                element={
                  <React.Suspense fallback={<Loader isLoading />}>
                    {/*// @ts-ignore*/}
                    <PlanPage />
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
      </PayPalScriptProvider>
    </>
  );
};
export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
