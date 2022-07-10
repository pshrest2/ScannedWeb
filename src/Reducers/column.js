const initialState = {
  people: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ],
  selectedPeople: [],
  name: '',
};

const column = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE':
      return {
        ...state,
        [payload.key]: payload.value,
      };
    case 'ADD_PERSON':
      return {
        ...state,
        people: [...state.people, payload.newPerson],
        selectedPeople: [...state.selectedPeople, payload.newPerson],
      };
    default:
      return state;
  }
};

export default column;
