import { cryptoAPIActionTypes } from './actions';

const initialCryptoApiState = {
  cryptoList: []
};

export const cryptoApiReducer = (
  state = initialCryptoApiState,
  { type, payload }: { type: keyof typeof cryptoAPIActionTypes; payload: any }
) => {
  switch (type) {
    case cryptoAPIActionTypes.SET_LIST:
      return { ...state, cryptoList: payload };
    case cryptoAPIActionTypes.RESET_CRYPTO_API:
      return { ...state, ...initialCryptoApiState };
    default:
      return state;
  }
};
