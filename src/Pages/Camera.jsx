import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Camera = () => {
  const [connection, setConnection] = useState(null);
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };
  const handleUploadImage = async () => {
    if (connection._connectionStarted) {
      try {
        await connection.send('UploadImage', image);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('No connection to server yet.', { appearance: 'error' });
    }
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5001/hub/upload')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Camera Connected!');
        })
        .catch((e) => console.log('Connection failed: ', e));
    }
  }, [connection]);
  return (
    <div className="camera-container">
      <input type="text" value={image} onChange={handleImageChange} />
      <Button variant="secondary" onClick={handleUploadImage}>
        Send
      </Button>
    </div>
  );
};

export default Camera;
