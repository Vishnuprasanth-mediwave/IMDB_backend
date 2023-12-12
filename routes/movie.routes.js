const express = require("express");
const { validate } = require("../middlewares/validate.middleware");
const {
  addMovieController,
  getAllMovieController,
  getMovieController,
} = require("../controllers/movie.controller");
const { addMovieSchema } = require("../validations/movie.schema");
const { isAuthorised } = require("../middlewares/authorisation.middleware");
const { addRatingController } = require("../controllers/rating.controller");
const { addRatingSchema } = require("../validations/rating.schema");
const movieRouter = express.Router();

movieRouter.post(
  "/movie",
  isAuthorised,
  validate(addMovieSchema),
  addMovieController
);
movieRouter.get("/movies", getAllMovieController);
movieRouter.get("/movies/m", getMovieController);
movieRouter.post(
  "/movie/rating",
  isAuthorised,
  validate(addRatingSchema),
  addRatingController
);

module.exports = movieRouter;
