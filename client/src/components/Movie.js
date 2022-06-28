import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import authSrv from "../authService";
import MovieUtils from "../Utils/MovieUtils";
import { useSelector } from "react-redux";
import { useStyles } from "../MuiStyled/MuiStyles";
import ErrorHandler from "./constrols/ErrorHandler";
import Notification from "./constrols/Notification";

function Movie({ movie, delCallback }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const data = useSelector((state) => state);
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
  }, [navigate]);

  //functions

  const deleteMovie = async () => {
    try {
      if (data.user.permitions.includes("delete-movies")) {
        let resp = await MovieUtils.deleteMovie(movie.id);

        if (resp) {
          delCallback(resp);
        }
      } else {
        setNotify({
          isOpen: true,
          message: `${data.user.name} have not permission to delete movies`,
          type: "warning",
        });
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  const updMovie = () => {
    if (data.user.permitions.includes("update-movies")) {
      navigate("/menu/editmovie/" + movie.id);
    } else {
      setNotify({
        isOpen: true,
        message: `${data.user.name} have not permission to update movie data`,
        type: "warning",
      });
    }
  };

  return (
    <div>
      <ErrorHandler {...error} />
      <Card className={classes.movieCard}>
        <div className="mov-title">
          {" "}
          {movie.name} {movie.premiered}{" "}
        </div>{" "}
        <br />
        <div className="mov-gener"> {movie.genres.toString()} </div>
        <br />
        <div className="mov-sub-per">
          <div className="mov-img">
            {" "}
            <img className="img-box" src={movie.image} alt="no pict"></img>{" "}
          </div>

          <div className="mov-sub">
            <div className="title"> Subscriptions watched:</div> <br />
            {movie.movmember.length > 0 ? (
              <ul>
                {movie.movmember.map((mem) => {
                  return (
                    <li key={mem.memberid}>
                      {" "}
                      <Link
                        to={
                          data.user.permitions.includes("update-subscritions")
                            ? "/menu/editmember/" + mem.memberid
                            : ""
                        }
                      >
                        {" "}
                        {mem.membername} {mem.date}
                      </Link>{" "}
                    </li>
                  );
                })}
              </ul>
            ) : (
              "No Subscriptions for this movie"
            )}
          </div>
        </div>
        <div className="movie-btn">
          <Button
            className="movie-btn-prop"
            variant="secondary"
            onClick={deleteMovie}
          >
            Delete
          </Button>
          <Button
            className="movie-btn-prop"
            variant="secondary"
            onClick={updMovie}
          >
            Edit
          </Button>
        </div>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
export default Movie;
