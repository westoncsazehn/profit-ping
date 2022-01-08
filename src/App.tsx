import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Layout, SignIn } from "./pages";
import { auth, FBUser, UserContext } from "./api";

export const App = () => {
  const [user, setUser] = useState<FBUser>();
  onAuthStateChanged(auth, (user) => (user ? setUser(user) : false));

  if (user) {
    return (
      <UserContext.Provider value={user}>
        <Layout />
      </UserContext.Provider>
    );
  } else {
    return <SignIn />;
  }
};
