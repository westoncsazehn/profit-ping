import { Portfolio } from '../types';
import { portfolioActionTypes } from './actions';

const initialPortfolioState: Portfolio = {
  coins: [],
  userDeviceToken: ''
};

export const portfolioReducer = (
  state = initialPortfolioState,
  action: { type: keyof typeof portfolioActionTypes; payload: any }
) => {
  switch (action.type) {
    case portfolioActionTypes.ADD_GET_DEVICE_TOKEN_SUCCESS:
    case portfolioActionTypes.GET_DEVICE_TOKEN_SUCCESS:
      return { ...state, userDeviceToken: action.payload };
    case portfolioActionTypes.GET_USERS_CRYPTO_SUCCESS:
      return { ...state, coins: action.payload };
    case portfolioActionTypes.GET_DEVICE_TOKEN_FAILED:
    default:
      return state;
  }
};
