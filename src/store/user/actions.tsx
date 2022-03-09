// local
import { FBUser } from '../types';

export const userActionTypes = {
  SET_USER: 'SET_USER',
  SET_USER_SUCCESS: 'SET_USER_SUCCESS'
};

export const setUser = (user: FBUser) => ({
  type: userActionTypes.SET_USER,
  payload: user
});
export const setUserSuccess = (user: FBUser) => ({
  type: userActionTypes.SET_USER_SUCCESS,
  payload: user
});
