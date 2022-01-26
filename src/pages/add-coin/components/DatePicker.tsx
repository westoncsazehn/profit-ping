// 3rd party
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as DatePickerMUI } from '@mui/lab';
import { TextField } from '@mui/material';

export const DatePicker = ({
  onDateChange,
  value,
  name
}: {
  onDateChange: (value: any) => void;
  value: Date;
  name: string;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerMUI
        value={value}
        onChange={onDateChange}
        maxDate={new Date()}
        InputProps={{
          disabled: true,
          onKeyDown: (e: any) => e.preventDefault()
        }}
        renderInput={(params) => <TextField name={name} {...params} />}
      />
    </LocalizationProvider>
  );
};
