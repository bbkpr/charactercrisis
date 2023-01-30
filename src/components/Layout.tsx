import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  return (
    <>
      <Navbar sticky="top" variant="dark" bg="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <span className="text-lg ms-4">Character Crisis</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-center">
            <Nav.Link
              as={Link}
              to="/characters"
              active={location.pathname === '/characters' || location.pathname.startsWith('/characters/')}
            >
              Characters
            </Nav.Link>
            <Nav.Link as={Link} to="/charactersrt" active={location.pathname.startsWith('/charactersrt')}>
              Characters (Table)
            </Nav.Link>
            <Nav.Link as={Link} to="/games" active={location.pathname.startsWith('/games')}>
              Games
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname.startsWith('/about')}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Outlet />
      </Container>
    </>
  ) as React.ReactElement;
}

export default Layout;
