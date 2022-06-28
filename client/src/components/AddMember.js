import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authSrv from "../authService";
import memberUtils from "../Utils/memberUtils";
import ErrorHandler from "./constrols/ErrorHandler";
function AddMember() {
  const [member, setMmeber] = useState({ name: "", email: "", city: "" });
  const [error, setError] = useState({ isOpen: false, message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, [navigate]);

  //function

  async function handleNewMember() {
    try {
      let resp = await memberUtils.addNewMember(member);
      if (resp) {
        navigate("/menu/mainsub");
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  }

  return (
    <div className="add-mem-main">
      <ErrorHandler {...error} />
      <form className="main-form">
        <div className="add-mem-inp-main">
          <h3 style={{ color: "gray" }}>Add New Member</h3>
          <label>
            Member Name :
            <input
              className="add-mem-inp"
              type="text"
              placeholder="enter name"
              onChange={(e) => setMmeber({ ...member, name: e.target.value })}
              required
            />
          </label>{" "}
          <br />
          <label>
            Member Email :
            <input
              className="add-mem-inp"
              type="email"
              placeholder="enter email"
              onChange={(e) => setMmeber({ ...member, email: e.target.value })}
              required
            />
          </label>{" "}
          <br />
          <label>
            Member City :
            <input
              className="add-mem-inp"
              type="text"
              placeholder="enter city"
              onChange={(e) => setMmeber({ ...member, city: e.target.value })}
              required
            />
          </label>
          <br />
          <br />
          <Button variant="secondary" onClick={handleNewMember}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
