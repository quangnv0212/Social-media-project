const express = require("express");
const { getHomepage } = require("../controllers/user.controller");
const userRouter = express.Router();
userRouter.get("/", getHomepage);
module.exports = {
  userRouter,
};
