import { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
//import axios from "axios";
import Movie from "./Movie";
import authSrv from "../authService";
import MovieUtils from "../Utils/MovieUtils";
import { Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { useStyles } from "../MuiStyled/MuiStyles";
import ErrorHandler from "./constrols/ErrorHandler";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Movies() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [movies, setMovies] = useState([]);
  const [moviesCont, setMoviesCont] = useState([]);
  const [page, setPage] = useState(1);
  const [movieInp, setMovieInp] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedValueObj, setSelectedValueObj] = useState(null);
  const [error, setError] = useState({ isOpen: false, message: "" });

  const fetchAutoCompleteData = () => {
    let moviesArr = [...movies];
    if (movieInp !== "") {
      setSearchResults(
        moviesArr.filter((movie) =>
          movie.name.toLowerCase().includes(movieInp.toLowerCase())
        )
      );
    }
  };

  const renderNewMovie = () => {
    const movieId = selectedValueObj?.id;

    let movieArrTemp = [...movies];
    let newMoviesArr = movieArrTemp.filter((mov) => mov.id === movieId);

    setMoviesCont(newMoviesArr);
  };

  useEffect(() => {
    if (authSrv.getToken() == null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchAutoCompleteData();
  }, [movieInp]);

  useEffect(() => {
    if (selectedValueObj?.id !== undefined) {
      renderNewMovie();
    } else setMoviesCont(movies);
  }, [selectedValueObj]);

  useEffect(() => {
    fetchDataPages();
  }, [page]);

  async function fetchDataPages() {
    let resp = await MovieUtils.getPartialMovies(page, 10);

    setMovies((prevValue) => [...prevValue, ...resp]);
    setMoviesCont((prev) => [...prev, ...resp]);
  }

  const updState = useCallback(
    (movieId) => {
      let newMovieArr = movies.filter((el) => el.id !== movieId);
      setMovies(newMovieArr);
      setMoviesCont(newMovieArr);
    },
    [movies]
  );

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderMovies = useMemo(() => {
    return moviesCont.map((movie) => {
      return <Movie key={movie.id} movie={movie} delCallback={updState} />;
    });
  }, [moviesCont]);

  return (
    <div>
      <ErrorHandler {...error} />
      <Badge
        bg="secondary"
        style={{
          width: "500px",
          fontSize: "150%",
          color: "white",
          marginLeft: "-60%",
        }}
      >
        <h1>Movies List</h1>
      </Badge>

      <br />

      <Stack sx={{ width: 300, margin: "auto" }}>
        <Autocomplete
          className={classes.autoComp}
          id="movie-search"
          getOptionLabel={(searchResults) => searchResults.name}
          options={searchResults}
          sx={{ width: 300 }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          noOptionsText={"no available movies"}
          renderOption={(props, searchResults) => (
            <Box component="li" {...props} key={searchResults.id}>
              {searchResults.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              value={movieInp}
              onChange={(e) => setMovieInp(e.target.value)}
              {...params}
              label="search for movies"
            />
          )}
          onChange={(e, obj) => {
            setSelectedValueObj(obj);
            setMovieInp("");
          }}
        />
      </Stack>

      <div className="movie-grid">
        {/* {moviesCont.map((movie) => {
          return <Movie key={movie.id} movie={movie} delCallback={updState} />;
        })} */}
        {renderMovies}
      </div>

      <Button
        sx={{ fontFamily: "Lato", fontSize: "0.7rem", textTransform: "none" }}
        className="Button"
        onClick={loadMoreMovies}
      >
        <span style={{ fontSize: "15px" }}>
          Load More
          <ExpandMoreIcon sx={{ fontSize: "30px" }} id="svgBtn" />
        </span>
      </Button>

      <Outlet />
    </div>
  );
}
export default Movies;
