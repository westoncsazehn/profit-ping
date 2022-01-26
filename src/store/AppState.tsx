import React from 'react';
import { FBUser, LoaderType, Portfolio } from './types';

export type AppState = {
  portfolio: Portfolio;
  user: FBUser;
  loader: LoaderType;
};
