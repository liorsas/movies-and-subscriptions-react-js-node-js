const movieModelBl = require("../models/moviesModelBL");
const subscriptionModelBL = require("../models/subscriptionsModelBL");
const memberModelBL = require("../models/membersModelBL");
const mongoose = require("mongoose");

async function getMoviesArr() {
  try {
    let movies = await movieModelBl.getMovies();

    for (let i = 0; i < movies.length; i++) {
      let movID = movies[i]._id;
      movies[i].movieMember =
        await subscriptionModelBL.getSubscriptionsSearchByMovieId(movID);
    }

    for (j = 0; j < movies.length; j++) {
      for (k = 0; k < movies[j].movieMember.length; k++) {
        memID = movies[j].movieMember[k].memberid;

        movies[j].movieMember[k].membername = await memberModelBL.getMember(
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
          mov.movies.find((el) => el.movieid == movie.id).date
        ).toLocaleDateString("he-IL"),

        membername: mov.membername.name,
      })),
    }));

    return final;
  } catch (err) {
    console.log(err);
  }
}

async function getMoviesNew(obj) {
  try {
    let movies = await movieModelBl.getMovies2(obj);

    for (let i = 0; i < movies.length; i++) {
      let movID = movies[i]._id;
      movies[i].movieMember =
        await subscriptionModelBL.getSubscriptionsSearchByMovieId(movID);
    }

    for (j = 0; j < movies.length; j++) {
      for (k = 0; k < movies[j].movieMember.length; k++) {
        memID = movies[j].movieMember[k].memberid;

        movies[j].movieMember[k].membername = await memberModelBL.getMember(
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
          mov.movies.find((el) => el.movieid == movie.id).date
        ).toLocaleDateString("he-IL"),

        membername: mov.membername.name,
      })),
    }));

    return final;
  } catch (err) {
    console.log(err);
  }
}

async function deleteMovie(movieId) {
  try {
    //const movIdObId = mongoose.Types.ObjectId(movieId);
    //delete movie from collection movies
    let delMovieDB = await movieModelBl.deleteMovie(movieId);

    //deleteor update subscription collection

    let movieMembers =
      await subscriptionModelBL.getSubscriptionsSearchByMovieId(movieId);

    if (movieMembers) {
      let newMovieMembers = movieMembers.map((mem) => ({
        _id: mem._id,
        memberid: mem.memberid,
        movies: mem.movies.filter((mov) => mov.movieid.toString() !== movieId),
      }));
      //console.log(newMovieMembers);

      //  get subscription id
      let moviememID = newMovieMembers.map((mem) => mem._id);

      let finalMmembers = newMovieMembers.map((mem) => ({
        memberid: mem.memberid,
        movies: mem.movies,
      }));

      // console.log(moviememID);

      //console.log(finalMmembers);

      //console.log(newMovieMembers)

      for (let i = 0; i < finalMmembers.length; i++) {
        if (finalMmembers[i].movies.length > 0) {
          //  console.log(finalMmembers[i].movies.length);
          let resp = await subscriptionModelBL.updateSubscription(
            moviememID[i].toString(),
            finalMmembers[i]
          );
        }

        if (finalMmembers[i].movies.length == 0) {
          console.log(moviememID[i].toString());
          let ans = await subscriptionModelBL.deleteSubscription(
            moviememID[i].toString()
          );
        }
      }

      if (movieMembers) {
        return true;
      } else {
        return;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function movieSearch(obj) {
  let movies = await movieModelBl.getMovies();

  let movieaFnd = movies.filter((movie) =>
    movie.name.toLowerCase().includes(obj)
  );
  console.log(movieaFnd);
}

module.exports = { getMoviesArr, deleteMovie, movieSearch, getMoviesNew };
