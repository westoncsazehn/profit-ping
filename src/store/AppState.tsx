// 3rd party
import React from 'react';
// local
import {
  AddCoinStateType,
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
  addCoin: AddCoinStateType;
};
