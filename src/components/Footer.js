import React from "react";
import { Container, Navbar } from "react-bootstrap";

export default function Footer() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand className="mx-auto">
          &copy; All right reserved 2021
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
