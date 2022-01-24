import React from 'react';
import { FBUser, Portfolio } from './types';

export type AppState = {
  portfolio: Portfolio;
  user: FBUser;
};
