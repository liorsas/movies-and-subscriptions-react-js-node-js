import axios from "axios";
import wsSubscriptionsDal from "../DALs/wsSubscriptionsDal";
import wsMembers from "../DALs/wsMembersDal";

async function getAllMovies() {
  try {
    let resp = await axios({
      method: "get",
      url: "https://moviesandsub.herokuapp.com/api/movies/all",

      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    let movies = resp.data;

    for (let i = 0; i < movies.length; i++) {
      let movID = movies[i]._id;
      movies[i].movieMember = await wsSubscriptionsDal.getSubWithMovId(movID);
    }

    for (let j = 0; j < movies.length; j++) {
      for (let k = 0; k < movies[j].movieMember.length; k++) {
        let memID = movies[j].movieMember[k].memberid;

        movies[j].movieMember[k].membername = await wsMembers.getMemberFromWs(
          memID
        );
      }
    }

    let final = movies.map((movie) => ({
      id: movie._id,
      name: movie.name,
      genres: movie.genres,
      image: movie.image,
      premiered: new Date(movie.premiered).getFullYear(),

      movmember: movie.movieMember.map((mov) => ({
        memberid: mov.memberid,
        date: new Date(
          mov.movies.find((el) => el.movieid === movie._id).date
        ).toLocaleDateString("he-IL"),

        membername: mov.membername.name,
      })),
    }));

    return final;
  } catch (err) {
    throw new Error("fail to get all the movies");
  }
}

async function getMovies() {
  try {
    let resp = await axios({
      method: "get",
      url: "https://moviesandsub.herokuapp.com/api/movies",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteMovie(movieId) {
  try {
    let resp = await axios({
      method: "delete",
      url: "https://moviesandsub.herokuapp.com/api/movies/" + movieId,

      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail deleting movie from the list.");
  }
}

async function getMovie(movId) {
  try {
    let resp = await axios({
      method: "get",
      url: "https://moviesandsub.herokuapp.com/api/movies/" + movId,

      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to get movie details.");
  }
}

async function updateMovie(movieId, movObj) {
  try {
    let resp = await axios({
      method: "put",
      url: "https://moviesandsub.herokuapp.com/api/movies/" + movieId,
      data: movObj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to update movie details.");
  }
}

async function addMovie(obj) {
  try {
    let resp = await axios({
      method: "post",
      url: "https://moviesandsub.herokuapp.com/api/movies",
      data: obj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to crate new movie.");
  }
}

async function movieSearch(obj) {
  try {
    let resp = await axios({
      method: "post",
      url: "https://moviesandsub.herokuapp.com/api/movies/src",
      data: obj,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("x-access-token"),
      },
    });

    return resp.data;
  } catch (err) {
    throw new Error("fail to find movie from the list.");
  }
}

async function getPartialMovies(page, limit) {
  let resp = await axios({
    method: "get",
    url: `https://moviesandsub.herokuapp.com/api/movies?page=${page}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("x-access-token"),
    },
  });

  return resp.data;
}

const exportMovies = {
  getMovies,
  getAllMovies,
  deleteMovie,
  getMovie,
  updateMovie,
  addMovie,
  movieSearch,
  getPartialMovies,
};
export default exportMovies;
