import { CoinAction } from '../types';

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
  TAKE_PROFIT_FAILED: 'TAKE_PROFIT_FAILED'
};

export const getDeviceToken = (userEmail: string) => ({
  type: portfolioActionTypes.GET_DEVICE_TOKEN,
  payload: userEmail
});
export const addDeviceToken = () => ({
  type: portfolioActionTypes.ADD_GET_DEVICE_TOKEN
});
export const getUsersCryptoList = (email: string) => ({
  type: portfolioActionTypes.GET_USERS_CRYPTO_LIST,
  payload: email
});
export const removeCoin = (coinAction: CoinAction) => ({
  type: portfolioActionTypes.REMOVE_COIN,
  payload: coinAction
});
export const takeProfit = (coinAction: CoinAction) => ({
  type: portfolioActionTypes.TAKE_PROFIT,
  payload: coinAction
});
