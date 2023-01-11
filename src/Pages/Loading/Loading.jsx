import React from 'react';
import { Spinner } from 'react-bootstrap';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import RenderMiddle from '../../Components/Common/RenderMiddle';
import './Loading.scss';

const Loading = () => {
  return (
    <BackgroundContainer>
      <RenderMiddle>
        <Spinner
          className="loading-page-spinner"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </RenderMiddle>
    </BackgroundContainer>
  );
};
export default Loading;
