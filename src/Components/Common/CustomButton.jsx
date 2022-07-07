import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  border: none;
  color: ${(props) => props.color};
  padding: 11px;
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.shadow ? '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' : 'none'};
  &:hover {
    color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverBackgroundColor};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor};
  }
`;

const CustomButton = (
  {
    children,
    onClick,
    color,
    backgroundColor,
    hoverBackgroundColor,
    hoverColor,
    shadow,
    disabled,
  },
  props
) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      hoverColor={hoverColor}
      shadow={shadow}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  shadow: PropTypes.bool,
  disabled: PropTypes.bool,
};

CustomButton.defaultProps = {
  color: '#000',
  backgroundColor: '#e2ba6b',
  hoverBackgroundColor: '#ffb775',
  hoverColor: '#000',
  shadow: false,
  disabled: false,
};
