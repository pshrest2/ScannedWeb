import React, { useState } from 'react';
import PropTyes from 'prop-types';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import CustomButton from '../../Components/Common/CustomButton';
import { Col, Form, Row } from 'react-bootstrap';

import './Signin.scss';
import useApiAccess from '../../Hooks/Api/useApiAccess';
import { useDispatch } from 'react-redux';
import { login } from '../../Actions/auth';

const Signin = () => {
  const [validated, setValidated] = useState(false);
  const [loginDto, setLoginDto] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { login: signin } = useApiAccess();

  const handleFieldChange = (name) => (e) => {
    setLoginDto({
      ...loginDto,
      [name]: e.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // make api call to login
      signin(loginDto).then((token) => {
        dispatch(login(token));
      });
    }
    setValidated(true);
  };

  return (
    <BackgroundContainer className="login-container">
      <div className="login-inner-container">
        <div className="login-header-container">
          <span className="login-header">Sign in</span>
          <span className="login-sub-header">
            Sign in and start managing your receipts
          </span>
        </div>

        <div className="login-body-container">
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginDto.email}
                onChange={handleFieldChange('email')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginDto.password}
                onChange={handleFieldChange('password')}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3 checkbox-field"
              controlId="formBasicCheckbox"
            >
              <Row>
                <Col>
                  <Form.Check type="checkbox" label="Remember me" />
                </Col>
                <Col className="forgot-password-link">
                  <a href="#">Forgot Password?</a>
                </Col>
              </Row>
            </Form.Group>

            <CustomButton
              className="login-button"
              variant="primary"
              type="submit"
              shadow
            >
              Login
            </CustomButton>
          </Form>
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Signin;

Signin.propTypes = {};
