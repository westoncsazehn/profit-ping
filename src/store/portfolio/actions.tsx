import { CoinAction, SortByType } from '../types';

export const portfolioActionTypes = {
  GET_DEVICE_TOKEN: 'GET_DEVICE_TOKEN',
  GET_DEVICE_TOKEN_SUCCESS: 'GET_DEVICE_TOKEN_SUCCESS',
  GET_DEVICE_TOKEN_FAILED: 'GET_DEVICE_TOKEN_FAILED',
  ADD_GET_DEVICE_TOKEN: 'ADD_GET_DEVICE_TOKEN',
  ADD_GET_DEVICE_TOKEN_SUCCESS: 'ADD_GET_DEVICE_TOKEN_SUCCESS',
  ADD_GET_DEVICE_TOKEN_FAILED: 'ADD_GET_DEVICE_TOKEN_FAILED',
  GET_USERS_CRYPTO_LIST: 'GET_USERS_CRYPTO_LIST',
  GET_USERS_CRYPTO_SUCCESS: 'GET_USERS_CRYPTO_SUCCESS',
  GET_USERS_CRYPTO_FAILED: 'GET_USERS_CRYPTO_FAILED',
  REMOVE_COIN: 'REMOVE_COIN',
  REMOVE_COIN_SUCCESS: 'REMOVE_COIN_SUCCESS',
  REMOVE_COIN_FAILED: 'REMOVE_COIN_FAILED',
  TAKE_PROFIT: 'TAKE_PROFIT',
  TAKE_PROFIT_SUCCESS: 'TAKE_PROFIT_SUCCESS',
  TAKE_PROFIT_FAILED: 'TAKE_PROFIT_FAILED',
  SORT_CRYPTO_LIST: 'SORT_CRYPTO_LIST'
};

export const getDeviceToken = (uid: string) => ({
  type: portfolioActionTypes.GET_DEVICE_TOKEN,
  payload: uid
});
export const addDeviceToken = () => ({
  type: portfolioActionTypes.ADD_GET_DEVICE_TOKEN
});
export const getUsersCryptoList = (uid: string) => ({
  type: portfolioActionTypes.GET_USERS_CRYPTO_LIST,
  payload: uid
});
export const removeCoin = (coinAction: CoinAction) => ({
  type: portfolioActionTypes.REMOVE_COIN,
  payload: coinAction
});
export const sortCryptoList = (sortBy: SortByType) => ({
  type: portfolioActionTypes.SORT_CRYPTO_LIST,
  payload: sortBy
});
