import { Button } from "react-bootstrap";
import { permission } from "../Utils/permission";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authSrv from "../authService";
import userUtils from "../Utils/usersUtils";
import ErrorHandler from "./constrols/ErrorHandler";
import Notification from "./constrols/Notification";
function AddNewUser() {
  const navigate = useNavigate();
  const [checkedState, setCheckedState] = useState(
    new Array(permission.length).fill(false)
  );
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    passward: "",
    role: "",
    sessiontimeout: 0,
  });
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

  useEffect(() => {
    let newCheck = [...checkedState];
    console.log(newCheck);
    if (newCheck[1] || newCheck[2] || newCheck[3] === true) {
      newCheck[0] = true;
    }
    if (newCheck[5] || newCheck[6] || newCheck[7] === true) {
      newCheck[4] = true;
    }

    setCheckedState(newCheck);
  }, []);

  //functions

  const handleNewUser = async () => {
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

      if (
        user.firstname !== "" &&
        user.lastname !== "" &&
        user.username !== "" &&
        user.passward !== "" &&
        user.sessiontimeout > 0 &&
        user.role !== ""
      ) {
        let obj = {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          passward: user.passward,
          role: user.role,
          SessionTimeOut: user.sessiontimeout,
          permission: perm,
        };

        if (user.role !== "Admin") {
          let resp = await userUtils.addNewUser(obj);
          if (resp) {
            navigate("/menu/users");
          }
        } else {
          setNotify({
            isOpen: true,
            message: `Have just one Admin in the application!`,
            type: "warning",
          });
        }
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    //setCheckedState(updatedCheckedState);

    let newCheck = [...updatedCheckedState];
    if (newCheck[1] || newCheck[2] || newCheck[3] === true) {
      newCheck[0] = true;
    }
    if (newCheck[5] || newCheck[6] || newCheck[7] === true) {
      newCheck[4] = true;
    }

    setCheckedState(newCheck);
  };

  return (
    <div className="add-user">
      <ErrorHandler {...error} />
      <form className="add-user-form">
        <div className="add-mem-inp-main">
          <h3 style={{ color: "gray" }}>Add New User</h3>
          <label>First Name:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
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
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            required
          />
          <br />
          <label>User Name:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
            placeholder="enter username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <br />
          <label style={{ marginLeft: "10px" }}>Passward:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
            placeholder="enter user passward"
            onChange={(e) => setUser({ ...user, passward: e.target.value })}
            required
          />
          <br />
          <label style={{ marginLeft: "10px" }}>User Role:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
            placeholder="enter user role"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          />
          <br />
          <label style={{ marginLeft: "-25px" }}>Session Time:</label>{" "}
          <input
            className="add-mem-inp"
            type="text"
            placeholder="enter session"
            onChange={(e) =>
              setUser({ ...user, sessiontimeout: parseInt(e.target.value) })
            }
            required
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
          <Button variant="secondary" onClick={handleNewUser}>
            Submit
          </Button>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </form>
    </div>
  );
}

export default AddNewUser;
