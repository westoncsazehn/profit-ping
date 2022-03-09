import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_KEY } from './reducer';
import { CoinAction, PortfolioCoin, SortByType } from '../types';

export const portfolioActionTypes = {
  GET_USERS_CRYPTO_LIST: 'GET_USERS_CRYPTO_LIST',
  GET_USERS_CRYPTO_SUCCESS: 'GET_USERS_CRYPTO_SUCCESS',
  GET_USERS_CRYPTO_FAILED: 'GET_USERS_CRYPTO_FAILED',
  REMOVE_COIN: 'REMOVE_COIN',
  REMOVE_COIN_SUCCESS: 'REMOVE_COIN_SUCCESS',
  REMOVE_COIN_FAILED: 'REMOVE_COIN_FAILED',
  SORT_CRYPTO_LIST: 'SORT_CRYPTO_LIST',
  RESET_PORTFOLIO: 'RESET_PORTFOLIO'
};

export const getUsersCryptoList = (uid: string) => {
  return {
    type: portfolioActionTypes.GET_USERS_CRYPTO_LIST,
    payload: uid
  };
};
export const removeCoin = (coinAction: CoinAction) => ({
  type: portfolioActionTypes.REMOVE_COIN,
  payload: coinAction
});
export const removeCoinSuccess = (filteredCoins: PortfolioCoin[]) => ({
  type: portfolioActionTypes.REMOVE_COIN_SUCCESS,
  payload: filteredCoins
});
export const sortDefaultCryptoList = () => ({
  type: portfolioActionTypes.SORT_CRYPTO_LIST,
  payload: { sortKey: DEFAULT_SORT_KEY, direction: DEFAULT_SORT_DIRECTION }
});
export const sortCryptoList = (sortBy: SortByType) => ({
  type: portfolioActionTypes.SORT_CRYPTO_LIST,
  payload: sortBy
});
export const setPortfolioCoins = (coins: PortfolioCoin[]) => ({
  type: portfolioActionTypes.GET_USERS_CRYPTO_SUCCESS,
  payload: coins
});
export const setDefaultPortfolioCoins = () => ({
  type: portfolioActionTypes.GET_USERS_CRYPTO_SUCCESS,
  payload: []
});
export const resetPortfolio = () => ({
  type: portfolioActionTypes.RESET_PORTFOLIO
});
