import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../Actions/auth';

const ScannlyNav = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = auth;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Scannly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? (
            <Nav className="">
              <Navbar.Text>{user.displayName}</Navbar.Text>
              <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="">
              <Nav.Link href="/signin">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ScannlyNav;
