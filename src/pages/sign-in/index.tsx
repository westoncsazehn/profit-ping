import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../api/util";
import React from "react";

export const SignIn = () => {
  const signIn = () => signInWithPopup(auth, provider);
  return <button onClick={signIn}> Sign In</button>;
};
