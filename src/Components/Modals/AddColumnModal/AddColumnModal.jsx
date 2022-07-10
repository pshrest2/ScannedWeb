import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CustomButton from '../../Common/CustomButton';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../../Actions/column';
import { display } from '../../../Actions/modal';
import { Modals } from '../../../Enums/Modals';
import { updateColumn } from '../../../Actions/receipt';

const AddColumnModal = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const column = useSelector((state) => state.column);
  const data = useSelector((state) => state.receipt);
  const dispatch = useDispatch();

  const { people, selectedPeople } = column;
  const { columnsData } = data;

  const handleCreateColumn = () => {
    handleClose();
    const id = uuidv4();
    const newColumnsData = {
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [id]: {
          id,
          title,
          splitBetween: selectedPeople,
          itemIds: [],
        },
      },
      columnOrder: [...columnsData.columnOrder, id],
    };
    dispatch(updateColumn(newColumnsData));
  };

  const handleCreatePeople = (inputValue) => {
    dispatch(update('name', inputValue));
    dispatch(display(Modals.AddPersonModal, true));
  };

  return (
    <Modal
      className="add-column-modal"
      size="sm"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a new column</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Column Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Column Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Split Between</Form.Label>
            <CreatableSelect
              isMulti
              onChange={(newValue) =>
                dispatch(update('selectedPeople', newValue))
              }
              onCreateOption={handleCreatePeople}
              options={people}
              value={selectedPeople}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton variant="secondary" onClick={handleClose}>
          Cancel
        </CustomButton>
        <CustomButton onClick={handleCreateColumn}>Create Column</CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AddColumnModal;

AddColumnModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
