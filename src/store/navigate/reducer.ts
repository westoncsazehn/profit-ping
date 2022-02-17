import { navigationActionTypes } from './actions';

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
      return { ...state, path: payload };
    default:
      return { ...state };
  }
};
