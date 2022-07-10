export const addName = (name) => ({
  type: 'ADD_NAME',
  payload: { name },
});

export const update = (key, value) => ({
  type: 'UPDATE',
  payload: { key, value },
});

export const addPerson = (newPerson) => ({
  type: 'ADD_PERSON',
  payload: { newPerson },
});
