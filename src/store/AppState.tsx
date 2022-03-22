// local
import {
  RecaptchaStateType,
  CryptoApiStateType,
  NavigateStateType,
  AddCoinStateType,
  DisplayAlertType,
  PaypalStateType,
  LoaderState,
  Portfolio,
  FBUser
} from './types';

export type AppState = {
  portfolio: Portfolio;
  user: FBUser;
  loader: LoaderState;
  displayAlert: DisplayAlertType;
  cryptoApi: CryptoApiStateType;
  addCoin: AddCoinStateType;
  recaptcha: RecaptchaStateType;
  navigate: NavigateStateType;
  paypal: PaypalStateType;
};
