// 3rd party
import React from 'react';
import { Alert, Snackbar } from '@mui/material';
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
      sx={{ top: '17px !important' }}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
