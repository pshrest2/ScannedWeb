import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Upload = () => {
  const [connection, setConnection] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubs/upload')
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

          connection.on('ReceiveImage', (imageMessage) => {
            setImage(imageMessage);
          });
        })
        .catch((error) => console.log('Connection failed: ', error));
    }
  }, [connection]);
  return (
    <div className="image-container">
      <h1>{image.message}</h1>
    </div>
  );
};

export default Upload;
