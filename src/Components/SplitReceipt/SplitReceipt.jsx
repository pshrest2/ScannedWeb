import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
const Container = styled.div`
  display: flex;
`;

const SplitReceipt = () => {
  const data = useSelector((state) => state.receipt);

  const hasData = receiptData.items.length > 0;
  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columnsData.columns[source.droppableId];
    const finish = columnsData.columns[destination.droppableId];
    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newColumnsData = {
        ...columnsData,
        columns: {
          ...columnsData.columns,
          [newColumn.id]: newColumn,
        },
      };
      dispatch(updateColumn(newColumnsData));
    } else {
      const startItemIds = Array.from(start.itemIds);
      startItemIds.splice(source.index, 1);
      const newStart = {
        ...start,
        itemIds: startItemIds,
      };

      const finishItemIds = Array.from(finish.itemIds);
      finishItemIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        itemIds: finishItemIds,
      };

      const newColumnsData = {
        ...columnsData,
        columns: {
          ...columnsData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      dispatch(updateColumn(newColumnsData));
    }
  };
  return (
    <div className="split-container">
      {hasData && (
        <>
          <Button onClick={() => dispatch(clear())}>Clear Receipt</Button>
          <Button onClick={() => setShowConfigureColumnModal(true)}>
            Add Column
          </Button>
        </>
      )}
      <div className="row">
        {hasData && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Container>
              {columnsData.columnOrder.map((columnId) => {
                const column = columnsData.columns[columnId];
                const items = [];
                column.itemIds.forEach((itemId) => {
                  const item = receiptData.items.find((i) => i.id === itemId);
                  items.push(item);
                });
                return <Column key={column.id} column={column} items={items} />;
              })}
            </Container>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default SplitReceipt;
