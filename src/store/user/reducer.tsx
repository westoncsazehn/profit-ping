// local
import { userActionTypes } from '../user';
import { FBUser } from '../types';

const initialUserState: FBUser = {
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
  uid: ''
};

export const userReducer = (
  state = initialUserState,
  action: { type: keyof typeof userActionTypes; payload: any }
) => {
  switch (action.type) {
    case userActionTypes.SET_USER:
    case userActionTypes.SIGN_IN_USER_SUCCESS:
      return { ...state, ...action.payload };
    case userActionTypes.SIGN_IN_USER_FAILED:
    default:
      return state;
  }
};
