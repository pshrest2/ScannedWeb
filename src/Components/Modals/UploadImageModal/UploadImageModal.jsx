import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import './UploadImageModal.scss';
import CustomButton from '../../Common/CustomerButton';

const UploadImageModal = ({ show, handleClose }) => {
  return (
    <Modal
      className="upload-image-modal"
      size="xs"
      show={show}
      onHide={handleClose}
    >
      <Modal.Body>
        <div className="image-upload-container">Drag and drop image here</div>
      </Modal.Body>

      <Modal.Footer>
        <CustomButton>Use this receipt</CustomButton>
        <CustomButton
          onClick={handleClose}
          backgroundColor="#bbbbbb"
          hoverBackgroundColor="#b1b1b1"
        >
          Cancel
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadImageModal;

UploadImageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
