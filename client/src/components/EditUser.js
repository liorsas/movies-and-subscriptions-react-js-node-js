import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authSrv from "../authService";
import userUtils from "../Utils/usersUtils";
import { permission } from "../Utils/permission";
import ErrorHandler from "./constrols/ErrorHandler";
import Notification from "./constrols/Notification";

function EditUser() {
  const navigate = useNavigate();
  const params = useParams();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    role: "",
    SessionTimeOut: 0,
    permissions: [],
  });
  const [error, setError] = useState({ isOpen: false, message: "" });
  const [notify, setNotify] = useState({
    iseOpen: false,
    message: "",
    type: "",
  });

  const [checkedState, setCheckedState] = useState(
    new Array(permission.length).fill(false)
  );

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    async function getuserFromServer() {
      try {
        let userId = params.id;

        let resp = await userUtils.getUser(userId);
        setUser(resp);
        setCheckedState(resp.checkPermisson);
      } catch (err) {
        console.log(err.message);
        setError({ isOpen: true, message: err.message });
      }
    }
    getuserFromServer();
  }, []);

  //function
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    let newCheck = [...updatedCheckedState];
    if (newCheck[1] || newCheck[2] || newCheck[3] === true) {
      newCheck[0] = true;
    }
    if (newCheck[5] || newCheck[6] || newCheck[7] === true) {
      newCheck[4] = true;
    }

    setCheckedState(newCheck);
  };

  const handleUpdateUser = async () => {
    try {
      let perArr = [];
      let count = permission.length;
      let pos = 0;
      while (count > 0) {
        if (checkedState[pos] === true) {
          perArr[pos] = permission[pos].name;
        }
        count--;
        pos++;
      }
      let perm = perArr.filter((el) => el !== "");

      let obj = {
        firstname: user.firstname,
        lastname: user.lastname,
        SessionTimeOut: user.SessionTimeOut,
        username: user.username,
        role: user.role,
        permissions: perm,
      };

      if (user.role !== "Admin") {
        let resp = await userUtils.updateUser(user.id, obj);

        if (resp) {
          navigate("/menu/users");
        } else {
          alert("nothing was updated");
        }
      } else {
        setNotify({
          isOpen: true,
          message: `you Cannot Update Admin details!`,
          type: "warning",
        });
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  return (
    <div>
      <ErrorHandler {...error} />
      <Notification notify={notify} setNotify={setNotify} />
      <form className="add-user-form">
        <div className="add-mem-inp-main">
          <h3 style={{ color: "gray" }}>Add New User</h3>
          <label>First Name:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
            value={user.firstname}
            placeholder="enter first name"
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            required
          />
          <br />
          <label>Last Name:</label>{" "}
          <input
            className="add-mem-inp"
            type="email"
            placeholder="enter last name"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            required
          />
          <br />
          <label>User Name:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
            placeholder="enter username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <br />
          <label>User Role:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
            placeholder="enter user role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          />
          <br />
          <label>Session Time:</label>{" "}
          <input
            className="add-mem-inp"
            type="number"
            placeholder="enter session"
            value={user.SessionTimeOut}
            onChange={(e) =>
              setUser({ ...user, SessionTimeOut: parseInt(e.target.value) })
            }
          />
          <br />
          <br />
          <label>Permissions:</label> <br />
          {permission.map((item, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={item}
                  value={item.name}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />{" "}
                {item.name}
              </div>
            );
          })}
          <br />
          <br />
          <Button variant="secondary" onClick={handleUpdateUser}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
