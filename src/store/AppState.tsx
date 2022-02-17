// local
import {
  AddCoinStateType,
  CryptoApiStateType,
  DisplayAlertType,
  FBUser,
  LoaderState,
  Portfolio,
  PhoneNumberStateType,
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
  phoneNumber: PhoneNumberStateType;
  recaptcha: RecaptchaStateType;
  navigate: NavigateStateType;
};
