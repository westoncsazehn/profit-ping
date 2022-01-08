import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Portfolio } from "../portfolio";
import { auth, FBUser, UserContext } from "../../api";
import { CoinPage } from "../coin";

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
          <Route path="/" element={<Portfolio />} />
          <Route path="/coin" element={<CoinPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
