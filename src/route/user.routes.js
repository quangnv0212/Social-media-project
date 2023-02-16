const express = require("express");
const {
  getHomepage,
  getAllUser,
  register,
  login,
} = require("../controllers/user.controller");
const userRouter = express.Router();
userRouter.get("/", getAllUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
module.exports = {
  userRouter,
};
