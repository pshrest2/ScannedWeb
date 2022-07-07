import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import img from '../../images//background.png';
const StyledContainer = styled.div`
  background-image: url(${img});
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #464646;
  height: 100vh;
  overflow: auto;
`;

const BackgroundContainer = ({ children, className }) => (
  <StyledContainer className={className}>{children}</StyledContainer>
);

export default BackgroundContainer;

BackgroundContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

BackgroundContainer.defaultPropTypes = {
  className: 'background-container',
};
