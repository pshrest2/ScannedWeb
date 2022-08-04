import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ScannlyNav = () => {
  const user = useSelector((state) => state.auth);
  const { isLoggedIn } = user;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Scannly</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? (
            <Navbar.Text>
              Signed in as: <a href="#">Pranaya Shrestha</a>
            </Navbar.Text>
          ) : (
            <Nav.Link href="/signin">SignIn</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ScannlyNav;
