import authSrv from "../authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import MovieUtils from "../Utils/MovieUtils";
import ErrorHandler from "./constrols/ErrorHandler";
function AddMovie() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    premiered: null,
    image: null,
  });
  const [error, setError] = useState({ isOpen: false, message: "" });

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, []);

  //func
  const handleNewMovie = async () => {
    try {
      let resp = await MovieUtils.addMovie(movie);
      if (resp) {
        navigate("/menu");
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  return (
    <div className="add-mem-main">
      <ErrorHandler {...error} />
      <form className="main-form">
        <div className="add-mem-inp-main">
          <h3 style={{ color: "gray" }}>Add New Movie</h3>
          <label>
            Movie Name:
            <input
              className="add-mem-inp"
              type="text"
              placeholder="enter name"
              onChange={(e) => setMovie({ ...movie, name: e.target.value })}
              required
            />
          </label>{" "}
          <br />
          <label>
            Movie Genres:
            <input
              className="add-mem-inp"
              type="text"
              placeholder="enter genres"
              onChange={(e) =>
                setMovie({ ...movie, genres: e.target.value.split(" ") })
              }
              required
            />
          </label>{" "}
          <br />
          <label>
            Movie Image:
            <input
              className="add-mem-inp"
              type="url"
              placeholder="enter image"
              onChange={(e) => setMovie({ ...movie, image: e.target.value })}
              required
            />
          </label>
          <br />
          <label className="lbl-add-mov">
            Movie Premiered:
            <input
              className="add-mem-inp"
              type="date"
              placeholder="enter premiered"
              onChange={(e) =>
                setMovie({
                  ...movie,
                  premiered: new Date(e.target.value).toISOString(),
                })
              }
              required
            />
          </label>{" "}
          <br />
          <br />
          <Button variant="secondary" onClick={handleNewMovie}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AddMovie;
