const moviesModel = require("./moviesModel");

function getMovies() {
  return new Promise((resolve, reject) => {
    moviesModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getMovies2(obj) {
  return new Promise((resolve, reject) => {
    moviesModel
      .find({}, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
      .limit(obj.limit * 1)
      .skip((obj.page - 1) * obj.limit);
  });
}

function getMoviesByName(moviename) {
  return new Promise((resolve, reject) => {
    moviesModel.find({ name: moviename }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getMovie(id) {
  return new Promise((resolve, reject) => {
    moviesModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function addMovie(obj) {
  return new Promise((resolve, reject) => {
    let movie = new moviesModel(obj);
    movie.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
}

function updateMovie(id, obj) {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
}

function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(id);
      }
    });
  });
}

module.exports = {
  getMovies,
  getMoviesByName,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovies2,
};
