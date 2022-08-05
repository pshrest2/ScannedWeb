import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import CustomButton from '../../Components/Common/CustomButton';

import './Register.scss';

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [registerDto, setRegisterDto] = useState({});
  const [error, setError] = useState('');

  const handleFieldChange = () => {};
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
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
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={registerDto.firstName}
                onChange={handleFieldChange('firstName')}
                required
              />
              <Form.Control.Feedback type="invalid">
                First name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={registerDto.lastName}
                onChange={handleFieldChange('lastName')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Last name is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={registerDto.email}
                onChange={handleFieldChange('email')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerDto.password}
                onChange={handleFieldChange('password')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={registerDto.confirmPassword}
                onChange={handleFieldChange('confirmPassword')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Confirm password is required
              </Form.Control.Feedback>
            </Form.Group>
            <CustomButton
              className="mb-2 register-button"
              variant="success"
              type="submit"
              shadow
            >
              Register
            </CustomButton>
            <Form.Label className="mb-2">
              Already have an account? <Link to="/signin">Login</Link>
            </Form.Label>
          </Form>
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Register;
