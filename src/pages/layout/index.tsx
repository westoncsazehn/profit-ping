import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, UserContext } from '../../api';
import { CoinPage } from '../coin';
import { FBUser } from '../../store';
import { PortfolioPageRx } from '../portfolio';

export const Layout = () => {
  const user = useContext<FBUser>(UserContext);
  const signOutOfApp = () => signOut(auth);

  return (
    <>
      <header>
        <span>Profit Ping</span>
        <span>{user?.displayName}</span>
        <button onClick={signOutOfApp}>Sign Out</button>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioPageRx />} />
          <Route path="/coin" element={<CoinPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
