import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Center = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
`;

const RenderMiddle = ({ children, className }) => (
  <Center className={className}>{children}</Center>
);

export default RenderMiddle;

RenderMiddle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

RenderMiddle.defaultPropTypes = {
  className: 'render-middle',
};
