export const cryptoAPIActionTypes = {
  GET_LIST: 'GET_LIST',
  SET_LIST: 'SET_LIST',
  RESET_CRYPTO_API: 'RESET_CRYPTO_API'
};

export const getList = () => ({
  type: cryptoAPIActionTypes.GET_LIST
});
