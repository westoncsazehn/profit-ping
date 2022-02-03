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
  SignInPageRx
} from './pages';
import { AppState, FBUser, signInUser } from './store';
import { auth, UserContext } from './api';
import { ADD_COIN_URL } from './pages/common/values';

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
  const [user, setUser] = useState<FBUser | null>();
  const baseUrlContent = Boolean(user) ? (
    <PortfolioPageRx />
  ) : (
    <SignInPageRx onSignIn={signInUser} />
  );
  onAuthStateChanged(auth, (user) => setUser(user || null));

  return (
    <UserContext.Provider value={user}>
      <Loader isLoading={isLoading} />
      <BrowserRouter>
        <LayoutRx>
          <Routes>
            <Route path="/" element={baseUrlContent} />
            <Route path={`/${ADD_COIN_URL}`} element={<AddCoinPageRx />} />
            <Route path={`/${ADD_COIN_URL}/:id`} element={<AddCoinPageRx />} />
            <Route path="*" element={baseUrlContent} />
          </Routes>
        </LayoutRx>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export const AppPageRx = connect(mapStateToProps, mapDispatchToProps)(App);
