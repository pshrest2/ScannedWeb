import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import Column from '../../Components/Common/Column';
import useApiAccess from '../../Hooks/Api/useApiAccess';
import { initialize, updateColumn, clear } from '../../Actions/receipt';
import { HubConnectionBuilder } from '@microsoft/signalr';
import getBaseUrl from '../../Helpers/getBaseUrl';
import ConfigureColumnModal from '../../Components/Modals/ConfigureColumnModal/ConfigureColumnModal';
import './Home.scss';

const Container = styled.div`
  display: flex;
`;

const Home = () => {
  const data = useSelector((state) => state.receipt);
  const { receiptData, columnsData } = data;
  const dispatch = useDispatch();

  const [loadingItems, setLoadingItems] = useState(false);
  const [imageData, setImageData] = useState({});
  const [showImage, setShowImage] = useState(false);
  const [connection, setConnection] = useState(null);
  const [showConfigureColumnModal, setShowConfigureColumnModal] =
    useState(false);
  const [hasUrl, setHasUrl] = useState(false);

  const { fetchReceiptData, fetchReceiptDataUrl } = useApiAccess();

  const hasData = receiptData.items.length > 0;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoadingItems(true);
    const receiptInfo = hasUrl
      ? await fetchReceiptDataUrl(imageData.imageSrc)
      : await fetchReceiptData(imageData.imageFile);
    const initialColumnId = uuidv4();
    const columnsInfo = {
      columns: {
        [initialColumnId]: {
          id: initialColumnId,
          title: 'All Items',
          splitBetween: 1,
          itemIds: receiptInfo.items.map((i) => i.id),
        },
      },
      columnOrder: [initialColumnId],
    };
    dispatch(initialize(receiptInfo, columnsInfo));
    setLoadingItems(false);
    setShowImage(false);
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

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageData({
          ...imageData,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
    setShowImage(true);
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${getBaseUrl()}/hub/upload`)
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected to the backend!');
          connection.on('ReceiveImage', (uri) => {
            setImageData({
              ...imageData,
              imageSrc: uri,
            });
            setShowImage(true);
            setHasUrl(true);
          });
        })
        .catch((error) => console.log('Connection failed: ', error));
    }
  }, [connection]);
  return (
    <div className="home-container">
      {showImage && (
        <div className="image-container">
          <img alt="receipt" id="receipt-image" src={imageData.imageSrc} />
        </div>
      )}
      <div className="upload-form-container">
        <form
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
          method="post"
        >
          <div className="input-container">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div className="button-container">
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </div>

      {hasData && (
        <>
          <Button onClick={() => dispatch(clear())}>Clear Receipt</Button>
          <Button onClick={() => setShowConfigureColumnModal(true)}>
            Add Column
          </Button>
        </>
      )}
      <div className="row">
        {loadingItems && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
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
      {showConfigureColumnModal && (
        <ConfigureColumnModal
          showConfigureColumnModal={showConfigureColumnModal}
          setShowConfigureColumnModal={setShowConfigureColumnModal}
        />
      )}
    </div>
  );
};

export default Home;
