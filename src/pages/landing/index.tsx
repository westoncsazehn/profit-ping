// 3rd party
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
// local
import { SIGN_IN_URL } from '../common';
export const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('item');
  }, []);
  return (
    <>
      <Typography color="primary"> LANDING PAGE</Typography>
      <Button
        onClick={() => navigate(SIGN_IN_URL)}
        variant="contained"
        color="primary">
        SIGN IN
      </Button>
    </>
  );
};
