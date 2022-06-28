import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import authSrv from "../authService";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { logOutUser } from "../redux/actions";
import ConfirmDialog from "./constrols/ConfirmDialog";
import Notification from "./constrols/Notification";

function MenuPage() {
  const location = useLocation();

  const storeData = useSelector((state) => state);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  const [notify, setNotify] = useState({
    iseOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timeOut = () => {
    setTimeout(() => {
      navigate("/");
    }, parseInt(storeData.user.sessionTime) * 100000);
  };

  useEffect(() => {
    if (storeData.user.role !== "Admin") timeOut();
  }, []);

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, [navigate]);

  const data = useSelector((state) => state);

  const logOutHandler = () => {
    sessionStorage.clear();
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <div className="menu-page">
      <Notification notify={notify} setNotify={setNotify} />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Movies And Subscriptions</Navbar.Brand>
          <Nav className="me-auto">
            {data.user.permitions?.includes("view-movies") && (
              <Nav.Link
                as={Link}
                to="/menu"
                style={{
                  backgroundColor:
                    location.pathname === "/menu/add" ||
                    location.pathname === "/menu"
                      ? "#708090"
                      : "",
                }}
              >
                Movies{" "}
              </Nav.Link>
            )}
            {data.user.permitions?.includes("view-subscritions") && (
              <Nav.Link
                as={Link}
                to="/menu/mainsub"
                style={{
                  backgroundColor:
                    location.pathname === "/menu/mainsub/add" ||
                    location.pathname === "/menu/mainsub"
                      ? "#708090"
                      : "",
                }}
              >
                Subscriptions{" "}
              </Nav.Link>
            )}
            {data.user.role === "Admin" && (
              <Nav.Link
                as={Link}
                to="/menu/users"
                style={{
                  backgroundColor:
                    location.pathname === "/menu/users/add" ||
                    location.pathname === "/menu/users"
                      ? "#708090"
                      : "",
                }}
              >
                Users Management
              </Nav.Link>
            )}
            <Nav.Link
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure that you want to leave this page?",
                  subtitle: "are you?",
                  onConfirm: logOutHandler,
                });
              }}
            >
              Log Out{" "}
            </Nav.Link>
          </Nav>
          <h3 style={{ float: "right", color: "white" }}>
            user connected:{" "}
            <Badge style={{ color: "red" }} bg="secondary">
              {data.user.name}
            </Badge>
          </h3>
        </Container>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Navbar>

      <Outlet />
    </div>
  );
}

export default MenuPage;
