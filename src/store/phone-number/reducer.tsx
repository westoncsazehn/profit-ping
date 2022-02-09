import { phoneNumberActionTypes } from './actions';

const initialPhoneNumberState = {
  phoneNumber: 0
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
    case phoneNumberActionTypes.ADD_PHONE_NUMBER_FAILED:
    case phoneNumberActionTypes.GET_PHONE_NUMBER_FAILED:
    default:
      return state;
  }
};
