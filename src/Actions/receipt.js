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

export const clearImage = () => ({
  type: 'CLEAR_IMAGE',
});

export const updateImageUri = (uri) => ({
  type: 'UPDATE_IMAGE_URI',
  payload: { uri },
});

export const updateImageData = (imageSrc, imageFile, fromUrl) => ({
  type: 'UPDATE_IMAGE_DATA',
  payload: { imageSrc, imageFile, fromUrl },
});

export const update = (key, value) => ({
  type: 'UPDATE',
  payload: { key, value },
});
