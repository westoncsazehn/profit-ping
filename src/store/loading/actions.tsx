export const loadingActionTypes = {
  SET_IS_LOADING: 'SET_IS_LOADING'
};
export const setIsLoading = (isLoading?: boolean) => ({
  type: loadingActionTypes.SET_IS_LOADING,
  payload: isLoading
});
