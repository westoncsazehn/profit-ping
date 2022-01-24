import React from 'react';
import { Button } from '@mui/material';

export const SignInPage = ({ onSignIn }: any) => {
  return (
    <>
      <Button onClick={onSignIn}>LOG IN</Button>
    </>
  );
};
