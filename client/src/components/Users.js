import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import axios from "axios";
import User from "./User";
import authSrv from "../authService";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "./constrols/ErrorHandler";
function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({ isOpen: false, message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let resp = await axios({
          method: "get",
          url: "http://localhost:3001/api/users/",

          headers: {
            "Content-Type": "application/json",
            "x-access-token": sessionStorage.getItem("x-access-token"),
          },
        });

        setUsers(resp.data);
      } catch (err) {
        console.log(err.message);
        setError({ isOpen: true, message: err.message });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, [navigate]);

  //function

  const deleteUserFromUsers = (userId) => {
    let usersArr = [...users];

    let filterUsers = usersArr.filter((el) => el.id !== userId);

    setUsers(filterUsers);
  };

  return (
    <div>
      <ErrorHandler {...error} />
      <Badge
        bg="secondary"
        style={{ fontSize: "150%", color: "white", marginLeft: "-20%" }}
      >
        <h1>Users Management</h1>
      </Badge>

      <div className="users-main">
        {users.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              callcackDeleteUser={deleteUserFromUsers}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Users;
