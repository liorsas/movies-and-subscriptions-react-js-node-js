import authSrv from "../authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import ErrorHandler from "./constrols/ErrorHandler";
import memberUtils from "../Utils/memberUtils";
import Member from "./Member";
function Subscriptions() {
  const navigate = useNavigate();

  const [subs, setSubs] = useState([]);
  const [error, setError] = useState({ isOpen: false, message: "" });

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, [navigate]);

  async function getSubscriptionsAll() {
    try {
      let resp = await memberUtils.getSubscriptions();
      setSubs(resp);
    } catch (err) {
      setError({ isOpen: true, message: err.message });
    }
  }

  useEffect(() => {
    getSubscriptionsAll();
  }, []);

  //functions
  const saveMovieToSubscriptions = (obj) => {
    let memID = obj.memid;

    let newObj = {
      movieid: obj.movieid,
      date: obj.date,
      moviename: obj.moviename,
    };

    let updSubs = [...subs];

    let fndIndex = updSubs.findIndex((el) => el.id === memID);

    updSubs[fndIndex].subscription.push(newObj);

    setSubs(updSubs);
  };

  const deleteMovieFromMember = (obj) => {
    let updSubs = [...subs];

    let fndIndex = updSubs.findIndex((el) => el.id === obj.memid);

    let movies = updSubs[fndIndex].subscription.filter(
      (mov) => mov.movieid !== obj.movieid
    );

    updSubs[fndIndex].subscription = movies;

    console.log(updSubs);

    setSubs(updSubs);
  };

  const deleteMember = (memID) => {
    let updSubs = [...subs];

    let fndIndex = updSubs.findIndex((el) => el.id === memID);

    updSubs.splice(fndIndex, 1);
    setSubs(updSubs);
  };

  return (
    <div>
      <ErrorHandler {...error} />
      <Badge
        className="sub-badge"
        bg="secondary"
        style={{
          fontSize: "150%",
          color: "white",
          marginLeft: "-60%",
          padding: "10px",
          width: "500px",
        }}
      >
        <h1>Subscriptions</h1>
      </Badge>

      <div className="sub-main">
        {subs.map((member) => {
          return (
            <Member
              key={member.id}
              member={member}
              callbackUpdMovie={saveMovieToSubscriptions}
              callbackDeleteMovieFromMember={deleteMovieFromMember}
              callbackDeleteMember={deleteMember}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Subscriptions;
