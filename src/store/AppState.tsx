// 3rd party
import React from 'react';
// local
import {
  CryptoApiStateType,
  DisplayAlertType,
  FBUser,
  LoaderType,
  Portfolio
} from './types';

export type AppState = {
  portfolio: Portfolio;
  user: FBUser;
  loader: LoaderType;
  displayAlert: DisplayAlertType;
  cryptoApi: CryptoApiStateType;
};
