const initialState = {
  configureColumnModal: false,
  uploadImageModal: false,
};

const modal = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'DISPLAY':
      return {
        ...state,
        [payload.modal]: payload.display,
      };
    default:
      return state;
  }
};

export default modal;
