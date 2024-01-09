const Joi = require("joi");

const addMovieSchema = Joi.object({
  movie_name: Joi.string().required(),
  // file: Joi.object({
  //   originalname: Joi.string().required(),
  //   mimetype: Joi.string()
  //     .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
  //     .required(),
  //   size: Joi.number().required(),
  //   // Add more file-related validations if needed
  // }).required(),
  release_year: Joi.number().required(),
  movie_desc: Joi.string().required(),
});

const updateMovieSchema = Joi.object({
  movie_name: Joi.string().optional(),
  image: Joi.string().optional(),
  release_year: Joi.number().optional(),
  movie_desc: Joi.string().optional(),
});
module.exports = { addMovieSchema, updateMovieSchema };
