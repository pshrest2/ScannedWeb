import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { clear, updateColumn } from '../../Actions/receipt';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../Common/Column';
import { v4 as uuidv4 } from 'uuid';
import CustomButton from '../Common/CustomButton';
import './SplitReceipt.scss';
import { display } from '../../Actions/modal';
import { Modals } from '../../Enums/Modals';

const Row = styled.div`
  display: flex;
  margin: 20px;
`;

const SplitReceipt = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.receipt);
  const { receiptData, columnsData } = data;

  const handleCreateColumn = () => {
    const id = uuidv4();
    const newColumnsData = {
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [id]: {
          id,
          splitBetween: [],
          itemIds: [],
        },
      },
      columnOrder: [...columnsData.columnOrder, id],
    };
    dispatch(updateColumn(newColumnsData));
  };

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
      <Row className="buttons-container">
        <CustomButton
          variant="secondary"
          onClick={() => dispatch(clear())}
          shadow
        >
          Clear Receipt
        </CustomButton>
        <CustomButton onClick={handleCreateColumn} shadow>
          Add Column
        </CustomButton>
        <CustomButton
          variant="success"
          onClick={() => dispatch(display(Modals.CollectMoneyModal, true))}
          shadow
        >
          Collect Money
        </CustomButton>
      </Row>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Row className="">
          {columnsData.columnOrder.map((columnId) => {
            const column = columnsData.columns[columnId];
            const items = [];
            column.itemIds.forEach((itemId) => {
              const item = receiptData.items.find((i) => i.id === itemId);
              items.push(item);
            });
            return <Column key={column.id} column={column} items={items} />;
          })}
        </Row>
      </DragDropContext>
    </div>
  );
};

export default SplitReceipt;
