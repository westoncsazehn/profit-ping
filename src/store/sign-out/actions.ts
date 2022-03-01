export const signOutActions = {
  SIGN_OUT: 'SIGN_OUT',
  RESET_APP_STATE: 'RESET_APP_STATE'
};

export const signOut = () => ({
  type: signOutActions.SIGN_OUT
});
