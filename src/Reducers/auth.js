const initialState = {
  token: '',
};

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        token: payload.token,
      };

    default:
      return state;
  }
};

export default auth;
