import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { updateColumn } from '../../../Actions/receipt';
import CustomButton from '../../Common/CustomButton';
import './ConfigureColumnModal.scss';

const ConfigureColumnModal = ({ show, handleClose }) => {
  const data = useSelector((state) => state.receipt);
  const { columnsData } = data;
  const dispatch = useDispatch();

  const [columnConfiguration, setColumnConfiguration] = useState({
    splitBetween: 0,
    title: '',
  });

  const handleCreateColumn = () => {
    handleClose();
    const id = uuidv4();
    const newColumnsData = {
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [id]: {
          id,
          title: columnConfiguration.title,
          splitBetween: +columnConfiguration.splitBetween,
          itemIds: [],
        },
      },
      columnOrder: [...columnsData.columnOrder, id],
    };
    dispatch(updateColumn(newColumnsData));
  };

  const handleColumnConfigurationChange = (name, e) => {
    setColumnConfiguration({
      ...columnConfiguration,
      [name]: e.target.value,
    });
  };

  return (
    <Modal
      className="configure-column-modal"
      size="sm"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Configure Column</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Column Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Column Title"
              value={columnConfiguration.title}
              onChange={(e) => {
                handleColumnConfigurationChange('title', e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Split Between</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of people to split items in this column"
              value={columnConfiguration.splitBetween}
              onChange={(e) => {
                handleColumnConfigurationChange('splitBetween', e);
              }}
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

export default ConfigureColumnModal;

ConfigureColumnModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
