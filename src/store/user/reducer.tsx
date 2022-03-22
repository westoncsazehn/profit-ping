// local
import { userActionTypes } from '../user';
import { FBUser } from '../types';

const initialUserState: FBUser = {
  phoneNumber: '',
  uid: '',
  isSubscribed: false
};

export const userReducer = (
  state = initialUserState,
  { type, payload }: { type: keyof typeof userActionTypes; payload: FBUser }
) => {
  switch (type) {
    case userActionTypes.SET_USER_SUCCESS:
      return { ...state, ...payload };
    case userActionTypes.SET_SUBSCRIBE_STATE_SUCCESS:
      return { ...state, isSubscribed: payload };
    case userActionTypes.RESET_USER:
      return { ...state, ...initialUserState };
    default:
      return { ...state };
  }
};
