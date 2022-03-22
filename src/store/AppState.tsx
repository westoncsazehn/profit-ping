// local
import {
  SubscriptionDetailsType,
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
  subscription: SubscriptionDetailsType;
  displayAlert: DisplayAlertType;
  cryptoApi: CryptoApiStateType;
  recaptcha: RecaptchaStateType;
  navigate: NavigateStateType;
  addCoin: AddCoinStateType;
  paypal: PaypalStateType;
  portfolio: Portfolio;
  loader: LoaderState;
  user: FBUser;
};
