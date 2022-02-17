export const phoneNumberActionTypes = {
  GET_PHONE_NUMBER: 'GET_PHONE_NUMBER',
  GET_PHONE_NUMBER_SUCCESS: 'GET_PHONE_NUMBER_SUCCESS',
  GET_PHONE_NUMBER_FAILED: 'GET_PHONE_NUMBER_FAILED',
  ADD_PHONE_NUMBER: 'ADD_PHONE_NUMBER',
  ADD_PHONE_NUMBER_SUCCESS: 'ADD_PHONE_NUMBER_SUCCESS',
  ADD_PHONE_NUMBER_FAILED: 'ADD_PHONE_NUMBER_FAILED'
};

export const getPhoneNumber = (uid: string) => ({
  type: phoneNumberActionTypes.GET_PHONE_NUMBER,
  payload: uid
});
export const addPhoneNumber = (uid: string, phoneNumber: number) => ({
  payload: { uid, phoneNumber }
});
