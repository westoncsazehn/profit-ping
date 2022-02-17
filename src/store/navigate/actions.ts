export const navigationActionTypes = {
  NAVIGATE_TO: 'NAVIGATE_TO'
};

export const navigateTo = (path: string = '') => ({
  type: navigationActionTypes.NAVIGATE_TO,
  payload: path
});
