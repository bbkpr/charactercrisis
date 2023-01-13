import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Container>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  ) as React.ReactElement;
}

export default Layout;
