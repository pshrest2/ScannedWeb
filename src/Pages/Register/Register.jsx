import { Form, useFormik, FormikProvider, useField } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import CustomButton from '../../Components/Common/CustomButton';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import './Register.scss';

const TextInputLiveFeedback = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);

  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={`${showFeedback ? (meta.error ? 'invalid' : 'valid') : ''}`}
    >
      <div className="form-label">
        <label htmlFor={props.id}>{label}</label>{' '}
        {showFeedback && (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
          >
            {meta.error ? meta.error : '✓'}
          </div>
        )}
      </div>
      <input
        {...props}
        {...field}
        className={'form-control mb-2'}
        onFocus={handleFocus}
      />
    </div>
  );
};

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    onSubmit: async (values) => {
      await sleep(500);
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .max(20, 'Must be less  than 20 characters')
        .required('Username is required')
        .matches(
          /^[a-zA-Z0-9]+$/,
          'Cannot contain special characters or spaces'
        ),
    }),
  });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  return (
    <BackgroundContainer className="register-container">
      <div className="register-inner-container">
        <div className="register-header-container">
          <span className="register-header">Create a free account</span>
          <span className="register-sub-header">
            Register and start managing your receipts
          </span>
        </div>

        <div className="register-body-container">
          <FormikProvider value={formik}>
            <Form>
              <TextInputLiveFeedback
                label="Username"
                id="username"
                name="username"
                type="text"
              />
              {/* <Field
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  onChange={handleFieldChange('firstName')}
                />
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  onChange={handleFieldChange('lastName')}
                />

                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleFieldChange('email')}
                />

                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleFieldChange('password')}
                />
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleFieldChange('confirmPassword')}
                /> */}
              <CustomButton
                className="mb-2 register-button"
                variant="success"
                type="submit"
                shadow
              >
                Register
              </CustomButton>
              {/* <Form.Label className="mb-2">
                  Already have an account? <Link to="/signin">Login</Link>
                </Form.Label> */}
            </Form>
          </FormikProvider>
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Register;

TextInputLiveFeedback.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
