export const login = (userToken) => ({
  type: 'LOGIN',
  payload: { userToken },
});
