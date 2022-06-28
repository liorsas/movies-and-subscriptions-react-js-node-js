import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class NavbarComp extends Component {
  render() {
    return (
      <div>
        <>
          <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand href="#home"></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/sub">Subscriptions</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      </div>
    );
  }
}