import authSrv from "../authService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import memberUtils from "../Utils/memberUtils";
import { useSelector } from "react-redux";
import ErrorHandler from "./constrols/ErrorHandler";
import { Button } from "react-bootstrap";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "./constrols/Notification";
import { useStyles } from "../MuiStyled/MuiStyles";

import { DatePicker } from "@material-ui/pickers";

function Member({
  member,
  callbackUpdMovie,
  callbackDeleteMovieFromMember,
  callbackDeleteMember,
}) {
  const [existDiv, setExistDiv] = useState(false);
  const [movieSelect, setMovieSelect] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [error, setError] = useState({ isOpen: false, message: "" });
  const [notify, setNotify] = useState({
    iseOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();

  const data = useSelector((state) => state);

  const navigate = useNavigate();
  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, [navigate]);

  //function

  const handleChange = (e) => {
    let movieFnd = member.unSeenMov.find((el) => el._id === e.target.value);
    setMovieSelect(movieFnd);
  };

  const saveMovieToMember = async () => {
    if (data.user.permitions.includes("create-subscritions")) {
      let objToSubComp = {
        memid: member.id,
        movieid: movieSelect._id,
        date: new Date(selectedDate).toLocaleDateString("he-IL"),
        moviename: movieSelect.name,
      };

      if (member.subscription.length > 0) {
        let movieToServer = {
          movieid: movieSelect._id,
          date: new Date(selectedDate).toISOString(),
        };
        let resp = await memberUtils.saveMovieToExistMmeber(
          member.id,
          movieToServer
        );
        if (resp) {
          callbackUpdMovie(objToSubComp);
        }
      } else {
        let movieToServer = {
          memberid: member.id,
          movies: {
            movieid: movieSelect._id,
            date: new Date(selectedDate).toISOString(),
          },
        };
        let resp = await memberUtils.saveMovieToNewMmeber(movieToServer);
        if (resp) {
          callbackUpdMovie(objToSubComp);
        }
      }
    } else {
      setNotify({
        isOpen: true,
        message: `${data.user.name} have not permission to Add movie to Mmebers`,
        type: "warning",
      });
    }
  };

  const deleteMovieFromMember = async (movId) => {
    if (data.user.permitions.includes("delete-movies")) {
      let resp = await memberUtils.deleteMovieFromMember(member.id, movId);

      let objToSubComp = {
        memid: member.id,
        movieid: movId,
      };
      callbackDeleteMovieFromMember(objToSubComp);
    } else {
      setNotify({
        isOpen: true,
        message: `${data.user.name} have not permission to delete movies`,
        type: "warning",
      });
    }
  };
  const deleteMember = () => {
    if (data.user.permitions.includes("delete-subscritions")) {
      let resp = memberUtils.deleteMember(member.id);

      callbackDeleteMember(resp);
    } else {
      setNotify({
        isOpen: true,
        message: `${data.user.name} have not permission to delete subscriptions`,
        type: "warning",
      });
    }
  };

  const moveToEditPage = () => {
    if (data.user.permitions.includes("update-subscritions")) {
      navigate("/menu/editmember/" + member.id);
    } else {
      setNotify({
        isOpen: true,
        message: `${data.user.name} have not permission to update subscriptions`,
        type: "warning",
      });
    }
  };

  return (
    <div className="sub-mem-main">
      <ErrorHandler {...error} />
      <Card style={{ borderColor: "purple" }}>
        <div className="mem-grid">
          <div className="det-mem">
            <h4>{member.name}</h4>
            <br />
            <h4>Email: {member.email}</h4>
            <br />
            <h4>City: {member.city}</h4>

            <br />
            <br />

            <Button
              className="movie-btn-prop"
              variant="secondary"
              onClick={moveToEditPage}
            >
              Edit{" "}
            </Button>
            <Button
              className="movie-btn-prop"
              variant="secondary"
              onClick={deleteMember}
            >
              Delete{" "}
            </Button>
          </div>
          <div>
            <Card
              style={{
                width: "300px",
                border: "3px solid gray",
                margin: "5px",
              }}
              text="dark"
            >
              <div>
                <h4>Movies Watched</h4>
                <br />
                <ul>
                  {member.subscription.map((mov, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        {mov.moviename} {mov.date}{" "}
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => deleteMovieFromMember(mov.movieid)}
                        />{" "}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>

            <br />
            <div>
              <Button
                variant="secondary"
                border="dark"
                bg="danger"
                trxt="dark"
                onClick={() => setExistDiv(!existDiv)}
              >
                Subscribe To New Movie
              </Button>
            </div>

            {existDiv && (
              <div className="unseen-mov-hidden-div">
                <h4>Add A New Movie</h4>
                <br />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Movie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={movieSelect?.name}
                    label="Select Movie"
                    onChange={handleChange}
                    style={{ width: "22rem", margin: "5px" }}
                  >
                    {member.unSeenMov.map((mov) => {
                      return (
                        <MenuItem key={mov._id} value={mov._id}>
                          {mov.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <br />
                  <DatePicker
                    style={{ width: "12rem", margin: "5px" }}
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </FormControl>

                <Button
                  className="movie-btn-prop"
                  variant="secondary"
                  onClick={saveMovieToMember}
                >
                  Save{" "}
                </Button>
              </div>
            )}
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </Card>
    </div>
  );
}

export default Member;
