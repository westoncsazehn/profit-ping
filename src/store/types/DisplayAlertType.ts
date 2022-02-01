// 3rd party
import { AlertColor } from '@mui/material';

export type DisplayAlertType = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
};
