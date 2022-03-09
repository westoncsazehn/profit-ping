import { BasePortfolioCoin } from '../types';

export const cryptoAPIActionTypes = {
  GET_LIST: 'GET_LIST',
  SET_LIST: 'SET_LIST',
  RESET_CRYPTO_API: 'RESET_CRYPTO_API'
};

export const getList = () => ({
  type: cryptoAPIActionTypes.GET_LIST
});
export const setList = (coinList: BasePortfolioCoin[]) => ({
  type: cryptoAPIActionTypes.SET_LIST,
  payload: coinList
});
export const resetCryptoApi = () => ({
  type: cryptoAPIActionTypes.RESET_CRYPTO_API
});
