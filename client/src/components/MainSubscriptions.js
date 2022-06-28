import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Subscriptions from "./Subscriptions";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorHandler from "./constrols/ErrorHandler";

function MainSubscriptions() {
  const location = useLocation();
  const [error, setError] = useState({ isOpen: false, message: "" });

  const getColor = (curr) => {
    if (location.pathname === curr) return "#708090";
  };

  const data = useSelector((state) => state);

  return (
    <div>
      <ErrorHandler {...error} />
      <br />

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Subscriptions</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/menu/mainsub"
              style={{ backgroundColor: getColor("/menu/mainsub") }}
            >
              All Members{" "}
            </Nav.Link>
            {data.user.permitions.includes("create-subscritions") && (
              <Nav.Link
                as={Link}
                to="/menu/mainsub/add"
                style={{ backgroundColor: getColor("/menu/mainsub/add") }}
              >
                Add Members{" "}
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />

      <Outlet to={<Subscriptions />} />
    </div>
  );
}

export default MainSubscriptions;
