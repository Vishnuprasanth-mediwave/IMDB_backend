const jwt = require("jsonwebtoken");
const { models } = require("../config/sequelize-config");
const config = require("../config/config");
const helper = require("../services/helper");

const addUserController = async (req, res, next) => {
  try {
    const searchUser = await models.users.findAll({
      attributes: ["email", "user_name"],
      where: { email: req.body.email, user_name: req.body.user_name },
    });
    if (searchUser.length == 0) {
      const usersCreate = await models.users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        phone_no: req.body.phone_no,
      });
      res.json({
        usersCreate,
      });
    } else {
      return next({
        status: 400,
        message: "user already exits, check the email and username",
      });
    }
  } catch (error) {
    return res.json({
      message: error.errors.map((d) => d.message),
    });
  }
};

const loginController = async (req, res, next) => {
  try {
    const searchUser = await models.users.findOne({
      where: {
        email: req.body.email,
        //  user_password: req.body.user_password
      },
    });
    if (searchUser === null) {
      return next({
        status: 400,
        message: "invalid email and username",
      });
    } else {
      const passwordMatch = await helper.comparePassword(
        req.body.user_password,
        searchUser.user_password
      );

      if (passwordMatch) {
        const payload = {
          user_id: searchUser.user_id,
          email: searchUser.email,
          user_name: searchUser.user_name,
        };
        const gen_token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: "1h",
        });
        const updateUser = await models.users.update(
          {
            token: gen_token,
          },
          {
            where: {
              id: searchUser.id,
            },
            returning: true,
          }
        );
        return res.json({
          gen_token,
        });
      }
      return res.status(403).json("Not valid");
    }
  } catch (error) {
    console.log("\n error...", error);
    return res.json(error);
  }
};

const accountViewController = async (req, res) => {
  try {
    const searchUser = await models.users.findOne({
      attributes: ["first_name", "last_name", "user_name", "email", "phone_no"],
      where: {
        user_id: req.decoded.user_id,
      },
      logging: true,
    });

    return res.json(searchUser);
  } catch (error) {
    console.log("\n error...", error);
    return res.json(error);
  }
};

const updateController = async (req, res, next) => {
  try {
    const searchUser = await models.users.findOne({
      where: { user_id: req.decoded.user_id },
    });
    if (searchUser === null) {
      return next({
        status: 400,
        message: "user not found",
      });
    } else {
      const updateUser = await models.users.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          user_name: req.body.user_name,
          user_password: req.body.user_password,
          phone_no: req.body.phone_no,
        },
        {
          where: {
            user_id: req.decoded.user_id,
          },
          returning: true,
          individualHooks: true,
        }
      );

      res.json({
        updateUser,
      });
    }
  } catch (error) {
    return res.json({
      message: error.errors.map((d) => d.message),
    });
  }
};
module.exports = {
  addUserController,
  loginController,
  accountViewController,
  updateController,
};
