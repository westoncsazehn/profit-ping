// local
import { FBUser } from '../types';

export const userActionTypes = {
  SET_USER: 'SET_USER',
  SET_USER_SUCCESS: 'SET_USER_SUCCESS',
  SET_SUBSCRIBE_STATE: 'SET_SUBSCRIBE_STATE',
  SET_SUBSCRIBE_STATE_SUCCESS: 'SET_SUBSCRIBE_STATE_SUCCESS',
  RESET_USER: 'RESET_USER'
};

export const setUser = (user: FBUser) => ({
  type: userActionTypes.SET_USER,
  payload: user
});
export const setUserSuccess = (user: FBUser) => ({
  type: userActionTypes.SET_USER_SUCCESS,
  payload: user
});
export const setSubscribeState = () => ({
  type: userActionTypes.SET_SUBSCRIBE_STATE
});
export const setSubscribeStateSuccess = (isSubscribed?: boolean) => ({
  type: userActionTypes.SET_SUBSCRIBE_STATE_SUCCESS,
  payload: isSubscribed
});
export const resetUser = () => ({
  type: userActionTypes.RESET_USER,
});
