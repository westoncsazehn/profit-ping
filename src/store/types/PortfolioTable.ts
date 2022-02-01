// 3rd party
import { ReactNode } from 'react';

export type HeaderItem = {
  label: string;
  value: string | ReactNode;
  action?: ReactNode;
  sortKey?: string;
};
