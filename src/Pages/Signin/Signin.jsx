import React, { useState } from 'react';
import BackgroundContainer from '../../Components/Common/BackgroundContainer';
import CustomButton from '../../Components/Common/CustomButton';
import { Col, Form, Row, Alert } from 'react-bootstrap';
import './Signin.scss';
import useApiAccess from '../../Hooks/Api/useApiAccess';
import { useDispatch } from 'react-redux';
import { login } from '../../Actions/auth';
import { useEffect } from 'react';

const Signin = () => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) return;

    try {
      const response = await signin(loginDto);
      if (response.status !== 200) return;
      dispatch(login(response.data));
      setValidated(true);
    } catch (error) {
      setError(error.response.data);
      setValidated(false);
    }
  };
  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);
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
          {error && <Alert variant="danger">{error}</Alert>}
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
