export const portfolioActionTypes = {
  GET_DEVICE_TOKEN: 'GET_DEVICE_TOKEN',
  GET_DEVICE_TOKEN_SUCCESS: 'GET_DEVICE_TOKEN_SUCCESS',
  GET_DEVICE_TOKEN_FAILED: 'GET_DEVICE_TOKEN_FAILED',
  ADD_GET_DEVICE_TOKEN: 'ADD_GET_DEVICE_TOKEN'
};

export const getDeviceToken = (userEmail: string) => ({
  type: portfolioActionTypes.GET_DEVICE_TOKEN,
  payload: userEmail
});
export const addDeviceToken = () => ({
  type: portfolioActionTypes.ADD_GET_DEVICE_TOKEN,
})