const express = require("express");
const jwt = require("jsonwebtoken");

const movieModelBl = require("../models/moviesModelBL");
const moviesBL = require("../BL/moviesBL");
const { validateToken } = require("../middlewares/AuthMiddleWare");

const router = express.Router();

router.get("/", validateToken, async function (req, resp) {
  const { page = 1, limit = 10 } = req.query;

  let obj = {
    page: page,
    limit: limit,
  };

  let movies = await moviesBL.getMoviesNew(obj);
  return resp.json(movies);
  // }
});

router.get("/:id", validateToken, async function (req, resp) {
  let idval = req.params.id;

  let movie = await movieModelBl.getMovie(idval);
  return resp.json(movie);
});

router.post("/", validateToken, async function (req, resp) {
  let data = req.body;

  let status = await movieModelBl.addMovie(data);
  return resp.json(status);
});

router.put("/:id", validateToken, async function (req, resp) {
  let id = req.params.id;
  let obj = req.body;

  let status = await movieModelBl.updateMovie(id, obj);
  return resp.json(status);
});

router.delete("/:id", validateToken, async function (req, resp) {
  let id = req.params.id;

  let status = await moviesBL.deleteMovie(id);

  return resp.json(id);
});

router.post("/src", validateToken, async function (req, resp) {
  let data = req.body;

  let status = await moviesBL.movieSearch(data.name);
  return resp.json(status);
});

module.exports = router;
