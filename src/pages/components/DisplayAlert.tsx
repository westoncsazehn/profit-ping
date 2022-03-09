// 3rd party
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
// local
import { DisplayAlertType } from '../../store';

export const DisplayAlert = ({ open, message, severity }: DisplayAlertType) => {
  return (
    <Snackbar
      open={open}
      message={message}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      sx={{ top: '10px !important' }}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
