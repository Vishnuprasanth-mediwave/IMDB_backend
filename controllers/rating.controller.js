const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const addRatingController = async (req, res, next) => {
  try {
    const addRating = await models.ratings.create({
      movie_id: req.body.movie_id,
      rating: req.body.rating,
      user_id: req.decoded.user_id,
    });
    if (addRating) {
      res.json(addRating);
    } else {
      return next({
        status: 400,
        message: "Failed to add Rating",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};
module.exports = {
  addRatingController,
};
