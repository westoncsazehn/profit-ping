// local
import {
  AddCoinStateType,
  CryptoApiStateType,
  DisplayAlertType,
  FBUser,
  LoaderState,
  Portfolio,
  RecaptchaStateType,
  NavigateStateType
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
};
