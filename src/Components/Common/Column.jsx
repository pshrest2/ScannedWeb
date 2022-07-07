import React from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from './Item';
import { updateColumnTitle } from '../../Actions/receipt';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const ItemList = styled.div`
  padding: 8px;
`;

const Column = ({ column, items }) => {
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    dispatch(updateColumnTitle(column.id, e.target.value));
  };

  const getTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  return (
    <Container>
      <input
        type="text"
        placeholder={"Enter column's title "}
        onChange={handleTitleChange}
        value={column.title}
      />
      <Droppable droppableId={column.id}>
        {(provided) => (
          <ItemList ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Item key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </ItemList>
        )}
      </Droppable>
      {`Total: $${getTotal()}`}
    </Container>
  );
};

export default Column;

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
