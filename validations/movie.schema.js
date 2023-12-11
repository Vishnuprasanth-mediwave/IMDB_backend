const Joi = require("joi");

const addMovieSchema = Joi.object({
  movie_name: Joi.string().required(),
  release_year: Joi.number().required(),
  movie_desc: Joi.string().required(),
});
module.exports = { addMovieSchema };
