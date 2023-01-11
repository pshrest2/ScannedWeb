import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { display } from '../../Actions/modal';
import { clearImage } from '../../Actions/receipt';
import { Modals } from '../../Enums/Modals';
import UploadImageModal from '../../Components/Modals/UploadImageModal';
import QRCodeModal from '../../Components/Modals/QRCodeModal';
import AddPersonModal from '../../Components/Modals/AddPersonModal';
import CollectMoneyModal from '../../Components/Modals/CollectMoneyModal';

const DisplayModals = () => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { uploadImageModal, qrCodeModal, addPersonModal, collectMoneyModal } =
    modal;

  const handleCloseUploadImageModal = () => {
    dispatch(display(Modals.UploadImageModal), false);
    dispatch(clearImage());
  };

  return (
    <>
      {uploadImageModal && (
        <UploadImageModal
          show={uploadImageModal}
          handleClose={handleCloseUploadImageModal}
        />
      )}
      {qrCodeModal && (
        <QRCodeModal
          show={qrCodeModal}
          handleClose={() => dispatch(display(Modals.QRCodeModal), false)}
        />
      )}
      {addPersonModal && (
        <AddPersonModal
          show={addPersonModal}
          handleClose={() => dispatch(display(Modals.AddPersonModal, false))}
        />
      )}
      {collectMoneyModal && (
        <CollectMoneyModal
          show={collectMoneyModal}
          handleClose={() => dispatch(display(Modals.CollectMoneyModal, false))}
        />
      )}
    </>
  );
};
export default DisplayModals;
