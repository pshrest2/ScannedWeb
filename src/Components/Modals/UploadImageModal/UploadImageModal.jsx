import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from '../../../Actions/receipt';
import { Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import CustomButton from '../../Common/CustomButton';
import useApiAccess from '../../../Hooks/Api/useApiAccess';
import PropTypes from 'prop-types';
import './UploadImageModal.scss';

const UploadImageModal = ({ show, handleClose }) => {
  const data = useSelector((state) => state.receipt);
  const dispatch = useDispatch();
  const { imageData } = data;
  const { fetchReceiptData, fetchReceiptDataUrl } = useApiAccess();

  const [loadingItems, setLoadingItems] = useState(false);
  const handleSubmit = async () => {
    setLoadingItems(true);
    const receiptInfo = imageData.fromUrl
      ? await fetchReceiptDataUrl(imageData.imageSrc)
      : await fetchReceiptData(imageData.imageFile);
    const initialColumnId = uuidv4();
    const columnsInfo = {
      columns: {
        [initialColumnId]: {
          id: initialColumnId,
          title: 'All Items',
          splitBetween: 1,
          itemIds: receiptInfo.items.map((i) => i.id),
        },
      },
      columnOrder: [initialColumnId],
    };
    dispatch(initialize(receiptInfo, columnsInfo));
    setLoadingItems(false);
    handleClose();
  };
  console.log(imageData);
  return (
    <Modal
      className="upload-image-modal"
      size="xs"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="image-preview-container">
          <img src={imageData.imageSrc} alt="test" />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <CustomButton
          onClick={handleClose}
          backgroundColor="#bbbbbb"
          hoverBackgroundColor="#b1b1b1"
        >
          Go back
        </CustomButton>
        <CustomButton disabled={loadingItems} onClick={handleSubmit}>
          {loadingItems ? 'Loading...' : 'Use this receipt'}
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
