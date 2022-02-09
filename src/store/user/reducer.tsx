// local
import { userActionTypes } from '../user';
import { FBUser } from '../types';

const initialUserState: FBUser = {
  displayName: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  providerId: '',
  uid: ''
};

export const userReducer = (
  state = initialUserState,
  action: { type: keyof typeof userActionTypes; payload: FBUser }
) => {
  switch (action.type) {
    case userActionTypes.SET_USER:
    case userActionTypes.SIGN_IN_USER_SUCCESS:
      return { ...action.payload };
    case userActionTypes.SIGN_IN_USER_FAILED:
    default:
      return state;
  }
};
