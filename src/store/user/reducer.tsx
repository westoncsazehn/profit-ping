// local
import { userActionTypes } from '../user';
import { FBUser } from '../types';

const initialUserState: FBUser = {
  phoneNumber: '',
  uid: ''
};

export const userReducer = (
  state = initialUserState,
  { type, payload }: { type: keyof typeof userActionTypes; payload: FBUser }
) => {
  switch (type) {
    case userActionTypes.SET_USER:
    case userActionTypes.SIGN_IN_USER_SUCCESS:
      return payload ? { ...payload } : { ...initialUserState };
    case userActionTypes.SIGN_IN_USER_FAILED:
    default:
      return { ...initialUserState };
  }
};
