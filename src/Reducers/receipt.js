const initialState = {
  receiptData: {
    items: [],
  },
  columnsData: {},
  imageData: {
    imageFile: null,
    imageSrc: null,
    fromUrl: false,
  },
};

const receipt = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE':
      return {
        ...state,
        receiptData: payload.receiptData,
        columnsData: payload.columnsData,
      };
    case 'UPDATE_COLUMN':
      return {
        ...state,
        columnsData: payload.columnsData,
      };
    case 'UPDATE_COLUMN_TITLE':
      return {
        ...state,
        columnsData: {
          ...state.columnsData,
          columns: {
            ...state.columnsData.columns,
            [payload.columnId]: {
              ...state.columnsData.columns[payload.columnId],
              title: payload.title,
            },
          },
        },
      };
    case 'UPDATE':
      return {
        ...state,
        [payload.key]: payload.value,
      };
    case 'UPDATE_IMAGE_URI':
      return {
        ...state,
        imageData: {
          ...state.imageData,
          imageSrc: payload.uri,
          fromUrl: true,
        },
      };
    case 'UPDATE_IMAGE_DATA':
      return {
        ...state,
        imageData: {
          ...state.imageData,
          imageSrc: payload.imageSrc,
          imageFile: payload.imageFile,
          fromUrl: payload.fromUrl,
        },
      };
    case 'CLEAR':
      return initialState;
    case 'CLEAR_IMAGE':
      return {
        ...state,
        imageData: initialState.imageData,
      };
    default:
      return state;
  }
};

export default receipt;
