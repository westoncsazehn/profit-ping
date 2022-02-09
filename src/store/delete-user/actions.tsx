export const deleteUserActionTypes = {
  DELETE_USER: 'DELETE_USER'
};

export const deleteUser = (uid: string) => ({
  type: deleteUserActionTypes.DELETE_USER,
  payload: uid
});
