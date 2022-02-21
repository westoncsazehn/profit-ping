import { phoneNumberActionTypes } from './actions';

const initialPhoneNumberState = {
  phoneNumber: null
};

export const phoneNumberReducer = (
  state = initialPhoneNumberState,
  {
    type,
    payload
  }: { type: keyof typeof phoneNumberActionTypes; payload: number }
) => {
  switch (type) {
    case phoneNumberActionTypes.ADD_PHONE_NUMBER_SUCCESS:
    case phoneNumberActionTypes.GET_PHONE_NUMBER_SUCCESS:
      return { phoneNumber: payload };
    case phoneNumberActionTypes.RESET:
      return { ...state, phoneNumber: null };
    case phoneNumberActionTypes.ADD_PHONE_NUMBER_FAILED:
    case phoneNumberActionTypes.GET_PHONE_NUMBER_FAILED:
    default:
      return state;
  }
};
