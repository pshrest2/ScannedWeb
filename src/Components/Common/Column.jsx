import React from 'react';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Item from './Item';
import { updateColumn, updateColumnTitle } from '../../Actions/receipt';
import { FormControl } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
const Container = styled.div`
  margin: 8px;
  border-radius: 13px;
  background-color: #f2effc;
  padding: 25px 15px;
  position: relative;
`;
const InnerContainer = styled.div`
  margin: 0px 5px;
`;
const ItemList = styled.div`
  min-height: 100%;
`;

const Span = styled.span`
  position: absolute;
  top: 0px;
  right: 10px;
  transition: font-size 0.2s ease;
  -webkit-transition: font-size 0.2s ease;
  -moz-transition: font-size 0.2s ease;
  -o-transition: font-size 0.2s ease;
  &:hover {
    font-size: 17px;
  }
`;

const Column = ({ column, items }) => {
  const data = useSelector((state) => state.receipt);
  const dispatch = useDispatch();
  const { columnsData } = data;
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

  const handleDeleteColumn = () => {
    const columnsCopy = { ...columnsData.columns };
    const columnOrderCopy = [...columnsData.columnOrder];
    delete columnsCopy[column.id];

    const newColumnsData = {
      ...columnsData,
      columns: columnsCopy,
      columnOrder: columnOrderCopy.filter((x) => x !== column.id),
    };
    dispatch(updateColumn(newColumnsData));
  };
  return (
    <Container>
      <Span onClick={handleDeleteColumn}>
        <AiFillCloseCircle />
      </Span>

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
