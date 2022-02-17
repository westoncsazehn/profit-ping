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
    case userActionTypes.SET_USER_SUCCESS:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
