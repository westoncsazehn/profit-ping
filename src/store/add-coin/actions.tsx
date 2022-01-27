import { FirestoreAddCoin } from '../types';

export const addCoinActionTypes = {
  ADD_COIN: 'ADD_COIN'
};

export const addCoin = (coin: FirestoreAddCoin, email: string) => ({
  type: addCoinActionTypes.ADD_COIN,
  payload: { coin, email }
});
