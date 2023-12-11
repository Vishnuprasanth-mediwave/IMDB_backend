const Joi = require("joi");

const addRatingSchema = Joi.object({
  movie_id: Joi.string().required(),
  rating: Joi.number().max(5).required(),
});
module.exports = { addRatingSchema };
