import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateImageUri } from '../../Actions/receipt';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { display } from '../../Actions/modal';
import { Modals } from '../../Enums/Modals';
import getBaseUrl from '../../Helpers/getBaseUrl';
import Main from './Main';
import SplitReceipt from '../../Components/SplitReceipt/SplitReceipt';
import DisplayModals from './DisplayModals';
import './Home.scss';

const Home = () => {
  const data = useSelector((state) => state.receipt);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const { receiptData } = data;
  const [connection, setConnection] = useState(null);
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
          connection.on('ReceiveImage', (uri) => {
            dispatch(updateImageUri(uri));
            dispatch(display(Modals.UploadImageModal, true));
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [connection, dispatch]);
  return (
    <div className="home-container">
      {!hasData ? <Main hiddenFileInput={hiddenFileInput} /> : <SplitReceipt />}
      <DisplayModals />
    </div>
  );
};

export default Home;
