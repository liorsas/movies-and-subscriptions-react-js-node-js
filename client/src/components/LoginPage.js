import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/actions";
import ErrorHandler from "./constrols/ErrorHandler";

import userUtils from "../Utils/usersUtils";

function LoginPage() {
  const dispatch = useDispatch();

  const [validLog, setValidLog] = useState(true);

  const navigate = useNavigate();

  const [login, setLogin] = useState({ username: "", passward: "" });
  const [error, setError] = useState({ isOpen: false, message: "" });

  const getLogin = async () => {
    try {
      let obj = {
        username: login.username,
        pass: login.passward,
      };

      let stat = await userUtils.loginUser(obj);

      if (stat.error) {
        setValidLog(false);
      } else {
        const user = stat.validUser;

        sessionStorage.setItem("x-access-token", stat.token);
        setValidLog(true);
        // dispatch({ type: "LoginUser", payload: user });
        dispatch(SetUser(user));

        navigate("/menu");
      }
    } catch (err) {
      setError({ isOpen: true, message: err.message });
    }
  };

  return (
    <div className="login-page">
      <ErrorHandler {...error} />

      <div className="login-box">
        <div className="log-form">
          <h1>Login Page</h1>
          <br />
          <label>
            User Name:
            <input
              className="log-inp"
              type="text"
              name="username"
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
            />
          </label>
          <br />
          <label className="log-pass-lbl">
            Passward:
            <input
              className="log-pass-inp"
              type="password"
              name="pass"
              onChange={(e) => setLogin({ ...login, passward: e.target.value })}
            />
          </label>

          <br />
          <br />
          <input
            className="log-btn"
            type="button"
            value="Sign In"
            onClick={getLogin}
          />

          <br />
          {!validLog ? (
            <h2 style={{ color: "red" }}> this username is not exists </h2>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
