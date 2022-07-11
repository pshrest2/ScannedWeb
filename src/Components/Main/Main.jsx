import React from 'react';
import { BsSearch, BsUpload } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { display } from '../../Actions/modal';
import { Modals } from '../../Enums/Modals';
import CustomButton from '../Common/CustomButton';
import PropTypes from 'prop-types';
import { updateImageData } from '../../Actions/receipt';

import './Main.scss';

const Main = ({ hiddenFileInput }) => {
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        dispatch(updateImageData(x.target.result, imageFile, false));
      };
      reader.readAsDataURL(imageFile);
    }
    dispatch(display(Modals.UploadImageModal, true));
  };
  return (
    <div className="main-container">
      <div className="title-container">
        live for the <span className="title-focus">now</span>, split the bill{' '}
        <span className="title-focus">later</span>
      </div>
      <div className="buttons-container">
        <CustomButton onClick={() => hiddenFileInput.current.click()} shadow>
          browse for receipt <BsSearch className="button-icon" />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </CustomButton>
        <span>or</span>
        <CustomButton
          onClick={() => dispatch(display(Modals.QRCodeModal, true))}
          shadow
        >
          upload from phone <BsUpload className="button-icon" />
        </CustomButton>
      </div>
    </div>
  );
};

export default Main;

Main.propTypes = {
  hiddenFileInput: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
