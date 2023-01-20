import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar sticky="top" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Character Crisis
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/characters">
                Characters
              </Nav.Link>
              <Nav.Link as={Link} to="/games">
                Games
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  ) as React.ReactElement;
}

export default Layout;
