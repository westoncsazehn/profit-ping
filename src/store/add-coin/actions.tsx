import { FirestoreAddCoin, FirestoreCoin } from '../types';

export const addCoinActionTypes = {
  ADD_COIN: 'ADD_COIN',
  UPDATE_COIN: 'UPDATE_COIN',
  GET_PORTFOLIO_COIN: 'GET_PORTFOLIO_COIN',
  SET_SELECTED_COIN: 'SET_SELECTED_COIN',
  RESET_SELECTED_COIN: 'RESET_SELECTED_COIN'
};

export const addCoin = (coin: FirestoreAddCoin, uid: string) => ({
  type: addCoinActionTypes.ADD_COIN,
  payload: { coin, uid }
});
export const updateCoin = (coin: FirestoreAddCoin, uid: string) => ({
  type: addCoinActionTypes.UPDATE_COIN,
  payload: { coin, uid }
});
export const getPortfolioCoin = (id: string, uid: string) => ({
  type: addCoinActionTypes.GET_PORTFOLIO_COIN,
  payload: { id, uid }
});
export const setSelectedCoin = (coin: Partial<FirestoreCoin>) => ({
  type: addCoinActionTypes.SET_SELECTED_COIN,
  payload: coin
});
export const resetSelectedCoin = () => ({
  type: addCoinActionTypes.RESET_SELECTED_COIN
});
