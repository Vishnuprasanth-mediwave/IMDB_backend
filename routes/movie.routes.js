const express = require("express");
const { validate } = require("../middlewares/validate.middleware");
const {
  addMovieController,
  getAllMovieController,
} = require("../controllers/movie.controller");
const { addMovieSchema } = require("../validations/movie.schema");
const { isAuthorised } = require("../middlewares/authorisation.middleware");
const movieRouter = express.Router();

movieRouter.post(
  "/movie",
  isAuthorised,
  validate(addMovieSchema),
  addMovieController
);
movieRouter.get("/movies", getAllMovieController);

module.exports = movieRouter;
