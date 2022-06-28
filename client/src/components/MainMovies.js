import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Movies from "./Movies";
import authSrv from "../authService";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorHandler from "./constrols/ErrorHandler";

function MainMovies() {
  const location = useLocation();
  const [error, setError] = useState({ isOpen: false, message: "" });

  const getColor = (curr) => {
    if (location.pathname === curr) return "#708090";
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, []);

  //functions
  const data = useSelector((state) => state);

  return (
    <div>
      <ErrorHandler {...error} />
      <br />

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Movies</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/menu"
              style={{ backgroundColor: getColor("/menu") }}
            >
              All Movies{" "}
            </Nav.Link>
            {data.user.permitions.includes("create-movies") && (
              <Nav.Link
                as={Link}
                to="/menu/add"
                style={{ backgroundColor: getColor("/menu/add") }}
              >
                Add Movies{" "}
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>

      <br />

      <Outlet to={<Movies />} />
    </div>
  );
}

export default MainMovies;
