// local
import { FBUser } from '../types';

export const userActionTypes = {
  SIGN_IN_USER: 'SIGN_IN_USER',
  SIGN_IN_USER_SUCCESS: 'SIGN_IN_USER_SUCCESS',
  SIGN_IN_USER_FAILED: 'SIGN_IN_USER_FAILED',
  SET_USER: 'SIGN_IN_USER'
};

export const signInUser = () => ({
  type: userActionTypes.SIGN_IN_USER
});
export const setUser = (user: FBUser) => ({
  type: userActionTypes.SET_USER,
  payload: user
});
