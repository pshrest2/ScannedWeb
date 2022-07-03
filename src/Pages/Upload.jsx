import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import getBaseUrl from '../Helpers/getBaseUrl';

const Upload = () => {
  const [connection, setConnection] = useState(null);
  const [image, setImage] = useState();

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
          console.log('Image uploader connected!');

          connection.on('ReceiveImage', (uri) => {
            console.log(uri);
            setImage(uri);
          });
        })
        .catch((error) => console.log('Connection failed: ', error));
    }
  }, [connection]);
  return (
    <div className="image-container">
      {image && <img src={image} height={200} width={200} />}
    </div>
  );
};

export default Upload;
