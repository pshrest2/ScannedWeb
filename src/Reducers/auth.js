const user = JSON.parse(localStorage.getItem('user'));

const guestState = {
  user: null,
  isLoggedIn: false,
};
const initialState = user ? { user, isLoggedIn: true } : guestState;

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(payload.user));
      return {
        ...state,
        user: payload.user,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return guestState;
    default:
      return state;
  }
};

export default auth;
