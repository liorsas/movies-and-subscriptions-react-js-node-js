import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authSrv from "../authService";
import memberUtils from "../Utils/memberUtils";
import ErrorHandler from "./constrols/ErrorHandler";

//import { MarkEmailUnread } from "@mui/icons-material";
function AddMember() {
  const [member, setMmeber] = useState({ name: "", email: "", city: "" });
  const [error, setError] = useState({ isOpen: false, message: "" });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getMemverUtils();
  }, []);

  //function

  const getMemverUtils = async () => {
    try {
      let memId = params.id;
      let resp = await memberUtils.getMember(memId);
      setMmeber(resp);
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  async function handleUpdMember() {
    try {
      let memId = params.id;

      let resp = await memberUtils.updateMember(memId, member);
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
      <form className="mem-form">
        <div className="add-mem-inp-main">
          <h3 style={{ color: "gray" }}>Edit Member</h3>
          <label>
            Member Name:
            <input
              className="add-mem-inp"
              type="text"
              placeholder="enter name"
              value={member.name}
              onChange={(e) => setMmeber({ ...member, name: e.target.value })}
              required
            />
          </label>{" "}
          <br />
          <label>
            Member Email:
            <input
              className="add-mem-inp"
              type="email"
              placeholder="enter email"
              value={member.email}
              onChange={(e) => setMmeber({ ...member, email: e.target.value })}
              required
            />
          </label>{" "}
          <br />
          <label>
            Member City:
            <input
              className="add-mem-inp"
              id="mem-inp-city"
              type="text"
              placeholder="enter city"
              value={member.city}
              onChange={(e) => setMmeber({ ...member, city: e.target.value })}
              required
            />
          </label>
          <br />
          <br />
          <Button variant="secondary" onClick={handleUpdMember}>
            Update Member
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
