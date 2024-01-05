const express = require("express");
const { validate } = require("../middlewares/validate.middleware");
const {
  addMovieController,
  getAllMovieController,
  getMovieController,
  updateMovieController,
  deleteMovieController,
} = require("../controllers/movie.controller");
const {
  addMovieSchema,
  updateMovieSchema,
} = require("../validations/movie.schema");
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
movieRouter.get("/movies/:id", getMovieController);
movieRouter.patch(
  "/movies/:id",
  isAuthorised,
  validate(updateMovieSchema),
  updateMovieController
);
movieRouter.delete("/movie/:id", isAuthorised, deleteMovieController);
movieRouter.post(
  "/movie/rating/:id",
  isAuthorised,
  validate(addRatingSchema),
  addRatingController
);

module.exports = movieRouter;
