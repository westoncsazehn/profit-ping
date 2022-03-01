// local
import { Portfolio } from '../types';
import { portfolioActionTypes } from './actions';
import { sortCoins } from './modifiers';

export const DEFAULT_SORT_KEY: string = 'multiplierSortValue';
export const DEFAULT_SORT_DIRECTION: string = 'desc';
const initialPortfolioState: Portfolio = {
  coins: [],
  sortBy: { sortKey: DEFAULT_SORT_KEY, direction: 'desc' }
};

export const portfolioReducer = (
  state = initialPortfolioState,
  { type, payload }: { type: keyof typeof portfolioActionTypes; payload: any }
) => {
  switch (type) {
    case portfolioActionTypes.GET_USERS_CRYPTO_SUCCESS:
    case portfolioActionTypes.REMOVE_COIN_SUCCESS:
    case portfolioActionTypes.TAKE_PROFIT_SUCCESS:
      return { ...state, coins: payload };
    case portfolioActionTypes.SORT_CRYPTO_LIST:
      return {
        ...state,
        coins: sortCoins(state.coins || [], payload),
        sortBy: payload
      };
    case portfolioActionTypes.RESET:
      return { ...state, ...initialPortfolioState };
    default:
      return state;
  }
};
