const initialState = {
  token: '',
  isLoggedIn: false,
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        token: payload.token,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default auth;
