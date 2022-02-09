// local
import {
  AddCoinStateType,
  CryptoApiStateType,
  DisplayAlertType,
  FBUser,
  LoaderState,
  Portfolio,
  PhoneNumberStateType
} from './types';

export type AppState = {
  portfolio: Portfolio;
  user: FBUser;
  loader: LoaderState;
  displayAlert: DisplayAlertType;
  cryptoApi: CryptoApiStateType;
  addCoin: AddCoinStateType;
  phoneNumber: PhoneNumberStateType;
};
