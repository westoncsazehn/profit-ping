export const cryptoAPIActionTypes = {
  GET_LIST: 'GET_LIST',
  SET_LIST: 'SET_LIST',
  RESET: 'RESET'
};

export const getList = () => ({
  type: cryptoAPIActionTypes.GET_LIST
});
