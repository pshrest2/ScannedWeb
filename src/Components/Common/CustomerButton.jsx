import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CustomButton = (
  {
    children,
    onClick,
    color,
    backgroundColor,
    hoverColor,
    hoverBackgroundColor,
    shadow,
  },
  props
) => {
  const StyledButton = styled.button`
    background-color: ${backgroundColor};
    border: none;
    color: ${color};
    padding: 11px;
    border-radius: 12px;
    box-shadow: ${shadow ? '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' : 'none'};
    &:hover {
      color: ${hoverColor};
      background-color: ${hoverBackgroundColor};
    }
  `;

  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  shadow: PropTypes.bool,
};

CustomButton.defaultProps = {
  color: '#000',
  backgroundColor: '#e2ba6b',
  hoverBackgroundColor: '#ffb775',
  hoverColor: '#000',
  shadow: false,
};
