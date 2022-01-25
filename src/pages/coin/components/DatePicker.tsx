import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as DatePickerMUI } from '@mui/lab';
import { TextField } from '@mui/material';

export const DATE_FORMAT: string = 'yyyy-MM-dd';
export const DatePicker = ({ onDateChange, value, name }: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerMUI
        value={value}
        onChange={onDateChange}
        renderInput={(params) => <TextField name={name} {...params} />}
        maxDate={new Date()}
      />
    </LocalizationProvider>
  );
};
