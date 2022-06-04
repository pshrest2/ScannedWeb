/* eslint-disable default-param-last */
const initialState = {
  receiptData: {
    items: [],
  },
  columnsData: {},
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
    case 'CLEAR':
      return {
        receiptData: {
          items: [],
        },
        columnsData: {},
      };
    default:
      return state;
  }
};

export default receipt;
