import React from 'react';
import { Spinner } from 'react-bootstrap';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import './Loading.scss';

const Loading = () => {
  return (
    <BackgroundContainer>
      <Spinner
        className="loading-page-spinner"
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </BackgroundContainer>
  );
};
export default Loading;
