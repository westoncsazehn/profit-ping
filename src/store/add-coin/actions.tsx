import { FirestoreAddCoin } from '../types';

export const addCoinActionTypes = {
  ADD_COIN: 'ADD_COIN',
  UPDATE_COIN: 'UPDATE_COIN',
  GET_PORTFOLIO_COIN: 'GET_PORTFOLIO_COIN',
  SET_SELECTED_COIN: 'SET_SELECTED_COIN',
  SET_DEFAULT_SELECTED_COIN: 'SET_DEFAULT_SELECTED_COIN'
};

export const addCoin = (coin: FirestoreAddCoin, email: string) => ({
  type: addCoinActionTypes.ADD_COIN,
  payload: { coin, email }
});
export const updateCoin = (coin: FirestoreAddCoin, email: string) => ({
  type: addCoinActionTypes.UPDATE_COIN,
  payload: { coin, email }
});
export const getPortfolioCoin = (id: string, email: string) => ({
  type: addCoinActionTypes.GET_PORTFOLIO_COIN,
  payload: {id, email}
});
