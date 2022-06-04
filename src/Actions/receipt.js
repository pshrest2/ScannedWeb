export const initialize = (receiptData, columnsData) => ({
  type: 'INITIALIZE',
  payload: { receiptData, columnsData },
});

export const updateColumn = (columnsData) => ({
  type: 'UPDATE_COLUMN',
  payload: { columnsData },
});

export const updateColumnTitle = (columnId, title) => ({
  type: 'UPDATE_COLUMN_TITLE',
  payload: { columnId, title },
});

export const clear = () => ({
  type: 'CLEAR',
});
