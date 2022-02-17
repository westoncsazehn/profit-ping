import { navigationActionTypes } from './actions';
import { auth } from '../../api';
import { PORTFOLIO_URL, SIGN_IN_URL } from '../../pages/common';

const initialNavigateState = {
  path: ''
};

export const navigateReducer = (
  state = initialNavigateState,
  {
    type,
    payload
  }: { type: keyof typeof navigationActionTypes; payload: string }
) => {
  switch (type) {
    case navigationActionTypes.NAVIGATE_TO:
      return { path: payload };
    default:
      const isUserSignedIn: boolean = Boolean(auth?.currentUser?.uid);
      return { path: isUserSignedIn ? PORTFOLIO_URL : SIGN_IN_URL };
  }
};
