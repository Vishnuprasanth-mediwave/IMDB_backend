const { models, Sequelize, sequelize } = require("../config/sequelize-config");
const config = require("../config/config");
const ratings = require("../models/ratings");

const addMovieController = async (req, res, next) => {
  try {
    const searchMovie = await models.movies.findAll({
      attributes: ["movie_name"],
      where: { movie_name: req.body.movie_name },
    });
    if (searchMovie.length == 0) {
      const movieCreate = await models.movies.create({
        movie_name: req.body.movie_name,
        image: req.body.image,
        release_year: req.body.release_year,
        movie_desc: req.body.movie_desc,
        user_id: req.decoded.user_id,
      });
      res.json({
        movieCreate,
      });
    } else {
      return next({
        status: 400,
        message: "movie already exits",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
const getAllMovieController = async (req, res, next) => {
  try {
    const pageSize = parseInt(req.query.pagesize) || 3;
    const page = parseInt(req.query.page) || 1;

    const getMovies = await models.movies.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      attributes: ["movie_id", "movie_name", "release_year", "image"],
      include: [
        {
          model: models.ratings,
          as: "ratings",
          attributes: ["rating"],
        },
      ],
    });

    const oneMovie = getMovies.map((m) => {
      const overallRating = m.ratings.length
        ? m.ratings.reduce((total, rating) => total + rating.rating, 0) /
          m.ratings.length
        : 0;
      return {
        movie_id: m.movie_id,
        movie_name: m.movie_name,
        release_year: m.release_year,
        image: m.image,
        rating: overallRating,
      };
    });

    res.json(oneMovie);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const getMovieController = async (req, res, next) => {
  try {
    const getMovie = await models.movies.findOne({
      attributes: [
        "movie_id",
        "movie_name",
        "release_year",
        "image",
        "movie_desc",
      ],
      where: { movie_id: req.params.id },
      include: [
        {
          model: models.ratings,
          as: "ratings",
          attributes: ["rating"],
          include: [
            {
              model: models.users,
              as: "userRating",
              attributes: ["user_name"],
            },
          ],
        },
        {
          model: models.users,
          as: "addedBy",
          attributes: ["user_name"],
        },
      ],
      logging: true,
    });

    const ratings = getMovie.ratings.map((rating) => ({
      rating: rating.rating,
      ratedBy: rating.userRating.user_name,
    }));

    const overallRating = getMovie.ratings.length
      ? getMovie.ratings.reduce((total, rating) => total + rating.rating, 0) /
        getMovie.ratings.length
      : 0;

    const movieWithFormattedData = {
      movie_id: getMovie.movie_id,
      movie_name: getMovie.movie_name,
      release_year: getMovie.release_year,
      movie_desc: getMovie.movie_desc,
      image: getMovie.image,
      addedBy: getMovie.addedBy.user_name,
      ratings,
      overallRating,
    };

    res.json(movieWithFormattedData);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
module.exports = {
  addMovieController,
  getAllMovieController,
  getMovieController,
};
