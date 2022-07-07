import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearImage, updateImageUri } from '../../Actions/receipt';
import { HubConnectionBuilder } from '@microsoft/signalr';
import getBaseUrl from '../../Helpers/getBaseUrl';
import ConfigureColumnModal from '../../Components/Modals/ConfigureColumnModal/ConfigureColumnModal';
import UploadImageModal from '../../Components/Modals/UploadImageModal/UploadImageModal';
import './Home.scss';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import Main from '../../Components/Main/Main';
import { display } from '../../Actions/modal';
import { Modals } from '../../Enums/Modals';
import SplitReceipt from '../../Components/SplitReceipt/SplitReceipt';

const Home = () => {
  const data = useSelector((state) => state.receipt);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const { configureColumnModal, uploadImageModal } = modal;
  const { receiptData } = data;
  const [connection, setConnection] = useState(null);

  const handleCloseUploadImageModal = () => {
    dispatch(display(Modals.UploadImageModal), false);
    dispatch(clearImage());
    hiddenFileInput.current.value = null;
  };
  const hasData = receiptData.items.length > 0;

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
            dispatch(updateImageUri(uri));
            dispatch(display(Modals.UploadImageModal, true));
          });
        })
        .catch((error) => console.log('Connection failed: ', error));
    }
  }, [connection]);
  return (
    <BackgroundContainer className="home-container">
      {!hasData ? <Main hiddenFileInput={hiddenFileInput} /> : <SplitReceipt />}

      {configureColumnModal && (
        <ConfigureColumnModal
          show={configureColumnModal}
          handleClose={() =>
            dispatch(display(Modals.ConfigureColumnModal), false)
          }
        />
      )}
      {uploadImageModal && (
        <UploadImageModal
          show={uploadImageModal}
          handleClose={handleCloseUploadImageModal}
        />
      )}
    </BackgroundContainer>
  );
};

export default Home;
