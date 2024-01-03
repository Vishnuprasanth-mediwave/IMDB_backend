const express = require("express");
const {
  signUpSchema,
  updateSchema,
  loginSchema,
  updatePasswordSchema,
} = require("../validations/authentication.schema");
const {
  addUserController,
  loginController,
  accountViewController,
  updateController,
  updatePasswordController,
  forgetPassword,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const { isAuthorised } = require("../middlewares/authorisation.middleware");
const { transporter, mailConfig } = require("../config/email-config");
const userRouter = express.Router();

userRouter.post("/signup", validate(signUpSchema), addUserController);

userRouter.post("/login", validate(loginSchema), loginController);

userRouter.get("/u", isAuthorised, accountViewController);

userRouter.patch(
  "/update",
  isAuthorised,
  validate(updateSchema),
  updateController
);
userRouter.put(
  "/u/update/password",
  isAuthorised,
  validate(updatePasswordSchema),
  updatePasswordController
);
userRouter.post("/forget/password", forgetPassword);

module.exports = userRouter;
