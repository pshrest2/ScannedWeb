import React from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from './Item';
import { updateColumnTitle } from '../../Actions/receipt';
import { FormControl, FormText } from 'react-bootstrap';

const Container = styled.div`
  margin: 8px;
  border-radius: 13px;
  background-color: #f2effc;
  padding: 15px;
`;
const InnerContainer = styled.div`
  margin: 0px 5px;
`;
const ItemList = styled.div`
  min-height: 100%;
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
    return Math.round(total * 100) / 100;
  };

  return (
    <Container>
      <FormControl
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
            <InnerContainer>{`Total: $${getTotal()}`}</InnerContainer>
          </ItemList>
        )}
      </Droppable>
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
