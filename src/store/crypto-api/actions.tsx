export const cryptoAPIActionTypes = {
  GET_LIST: 'GET_LIST',
  SET_LIST: 'SET_LIST'
};

export const getList = (uid: string, id: string = '') => ({
  type: cryptoAPIActionTypes.GET_LIST,
  payload: { uid, id }
});
