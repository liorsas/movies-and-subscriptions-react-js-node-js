import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";
import Users from "./Users";
import ErrorHandler from "./constrols/ErrorHandler";

function MainUsersAdmin() {
  const location = useLocation();
  const [error, setError] = useState({ isOpen: false, message: "" });

  const getColor = (curr) => {
    if (location.pathname === curr) return "#708090";
  };

  return (
    <div>
      <ErrorHandler {...error} />
      <br />

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Users Management</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/menu/users"
              style={{ backgroundColor: getColor("/menu/users") }}
            >
              All Users{" "}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/menu/users/add"
              style={{ backgroundColor: getColor("/menu/users/add") }}
            >
              Add User{" "}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />

      <Outlet to={<Users />} />
    </div>
  );
}

export default MainUsersAdmin;
