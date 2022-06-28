import { Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorHandler from "./constrols/ErrorHandler";
import MovieUtils from "../Utils/MovieUtils";
import { useStyles } from "../MuiStyled/MuiStyles";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  CardContent,
  Input,
  FormLabel,
  Button,
  TextField,
} from "@mui/material";

function EditMovie() {
  const params = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    premiered: "",
    image: "",
  });
  const [error, setError] = useState({ isOpen: false, message: "" });

  const fetchData = async () => {
    try {
      let movieId = params.id;

      let resp = await MovieUtils.getMovie(movieId);
      setMovie(resp);
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //function
  const updateMovie = async () => {
    try {
      let movObj = {
        name: movie.name,
        genres: movie.genres,
        image: movie.image,
        premiered: movie.premiered,
      };

      let resp = await MovieUtils.updateMovie(movie._id, movObj);

      if (resp) {
        navigate("/menu");
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  return (
    <div>
      <ErrorHandler {...error} />
      <br />
      <div className="mov-title-ed">
        {" "}
        <Badge pill bg="secondary">
          <h1> Edit Movies: {movie.name}</h1>{" "}
        </Badge>
      </div>
      <Card className={classes.editMovie} sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <FormLabel>
                {" "}
                Name:{" "}
                <Input
                  type="text"
                  value={movie.name}
                  onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                ></Input>{" "}
              </FormLabel>
              <br />
              <FormLabel>
                {" "}
                Genres:{" "}
                <Input
                  type="text"
                  value={movie.genres}
                  onChange={(e) =>
                    setMovie({ ...movie, genres: e.target.value.split(",") })
                  }
                ></Input>{" "}
              </FormLabel>
              <br />
              <FormLabel>
                {" "}
                Image Url:{" "}
                <Input
                  type="text"
                  value={movie.image}
                  onChange={(e) =>
                    setMovie({ ...movie, image: e.target.value })
                  }
                ></Input>{" "}
              </FormLabel>
              <br />
              <FormLabel>
                {" "}
                Premired:{" "}
                <Input
                  type="date"
                  Value={movie.premiered}
                  onChange={(e) =>
                    setMovie({
                      ...movie,
                      premiered: new Date(e.target.value).toISOString(),
                    })
                  }
                ></Input>{" "}
              </FormLabel>
              <br />
              <Button onClick={updateMovie}>Update</Button>
              <Button onClick={() => navigate("/menu")}>Cancel</Button>
            </Typography>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
          ></Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 400, height: 500 }}
          image={movie.image}
          alt={movie.name}
        />
      </Card>
    </div>
  );
}
export default EditMovie;
