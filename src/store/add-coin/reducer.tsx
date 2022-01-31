import { addCoinActionTypes } from './actions';
import { FirestoreCoin } from '../types';

const initialAddCoinState = {
  selectedCoin: {
    coin: '',
    initialDate: new Date(),
    initialInvestment: 0,
    targetMultiplier: 1.5
  }
};

export const addCoinReducer = (
  state = initialAddCoinState,
  {
    type,
    payload
  }: { type: keyof typeof addCoinActionTypes; payload: FirestoreCoin }
) => {
  switch (type) {
    case addCoinActionTypes.SET_SELECTED_COIN:
      return { ...state, selectedCoin: { ...payload } };
    default:
      return state;
  }
};
