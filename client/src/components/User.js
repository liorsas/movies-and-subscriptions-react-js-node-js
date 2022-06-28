import { Button } from "react-bootstrap";
import authSrv from "../authService";
import { useNavigate } from "react-router-dom";
import usersUtils from "../Utils/usersUtils";
import { useEffect, useState } from "react";
import ErrorHandler from "./constrols/ErrorHandler";
import Notification from "./constrols/Notification";

function User({ user, callcackDeleteUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState({ isOpen: false, message: "" });
  const [notify, setNotify] = useState({
    iseOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, []);

  //function
  const deleteUser = async () => {
    try {
      if (user.role !== "Admin") {
        let resp = await usersUtils.deleteUser(user.id);
        callcackDeleteUser(resp);
      } else {
        setNotify({
          isOpen: true,
          message: `you can not delete the user admin fro the application!`,
          type: "warning",
        });
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  return (
    <div className="user-main">
      <ErrorHandler {...error} />
      <Notification notify={notify} setNotify={setNotify} />
      <label className="user-main-lbl">Name:</label> {""} {user.firstname}{" "}
      {user.lastname} <br />
      <label className="user-main-lbl">User Name:</label> {""} {user.username}
      <br />
      <label className="user-main-lbl">Session Time Out:</label> {""}{" "}
      {user.SessionTimeOut}
      <br />
      <label className="user-main-lbl">Created Data:</label> {""}{" "}
      {user.createdate}
      <br />
      <label className="user-main-lbl">Permissions:</label>{" "}
      {user.permissions.join()}
      <br />
      <br />
      <div className="user-btn">
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/menu/edituser/" + user.id)}
        >
          Edit
        </Button>{" "}
        <Button variant="outline-secondary" onClick={deleteUser}>
          Delete
        </Button>{" "}
      </div>
    </div>
  );
}

export default User;
