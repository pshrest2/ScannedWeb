import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearImage, updateImageUri } from '../../Actions/receipt';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { display } from '../../Actions/modal';
import { Modals } from '../../Enums/Modals';
import getBaseUrl from '../../Helpers/getBaseUrl';
import UploadImageModal from '../../Components/Modals/UploadImageModal/UploadImageModal';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import Main from '../../Components/Main/Main';
import SplitReceipt from '../../Components/SplitReceipt/SplitReceipt';
import QRCodeModal from '../../Components/Modals/QRCodeModal/QRCodeModal';
import AddColumnModal from '../../Components/Modals/AddColumnModal/AddColumnModal';
import CustomButton from '../../Components/Common/CustomButton';
import AddPersonModal from '../../Components/Modals/AddPersonModal/AddPersonModal';
import './Home.scss';

const Home = () => {
  const data = useSelector((state) => state.receipt);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const { uploadImageModal, qrCodeModal, addColumnModal, addPersonModal } =
    modal;
  const { receiptData } = data;
  const [connection, setConnection] = useState(null);

  const handleCloseUploadImageModal = () => {
    dispatch(display(Modals.UploadImageModal), false);
    dispatch(clearImage());
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
  }, [connection, dispatch]);
  return (
    <BackgroundContainer className="home-container">
      {!hasData ? <Main hiddenFileInput={hiddenFileInput} /> : <SplitReceipt />}

      <UploadImageModal
        show={uploadImageModal}
        handleClose={handleCloseUploadImageModal}
      />
      <QRCodeModal
        show={qrCodeModal}
        handleClose={() => dispatch(display(Modals.QRCodeModal), false)}
      />
      <AddColumnModal
        show={addColumnModal}
        handleClose={() => dispatch(display(Modals.AddColumnModal, false))}
      />
      <AddPersonModal
        show={addPersonModal}
        handleClose={() => dispatch(display(Modals.AddPersonModal, false))}
      />
    </BackgroundContainer>
  );
};

export default Home;
