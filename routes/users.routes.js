const express = require("express");
const {
  signUpSchema,
  updateSchema,
  loginSchema,
} = require("../validations/authentication.schema");
const {
  addUserController,
  loginController,
  accountViewController,
  updateController,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const { isAuthorised } = require("../middlewares/authorisation.middleware");
const userRouter = express.Router();

userRouter.post("/signup", validate(signUpSchema), addUserController);

userRouter.post("/login", validate(loginSchema), loginController);

userRouter.get("/user/:id", isAuthorised, accountViewController);

userRouter.patch("/user/:id", validate(updateSchema), updateController);

module.exports = userRouter;
