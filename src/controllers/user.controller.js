const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../models");
const bcrypt = require("bcryptjs");
const createSendToken = require("../utils/createSendToken");
const AppError = require("../utils/appError");
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
const getAllUser = async (req, res) => {
  try {
    const userList = await db.User.findAll();
    res.status(200).json({
      status: "success",
      results: userList.length,
      data: {
        userList,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
const register = catchAsync(async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    address,
    gender,
    roleId,
    phonenumber,
    positionId,
    image,
  } = req.body;
  // tạo ra một chuỗi ngẫu nhiên
  const salt = bcrypt.genSaltSync(10);
  // mã hóa salt + password
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = await db.User.create({
    email,
    password: hashPassword,
    firstName,
    lastName,
    address,
    gender,
    roleId,
    phonenumber,
    positionId,
    image,
  });
  createSendToken(newUser, 201, res);
});
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password"), 400);
  }
  // b1 : tìm ra user đang đăng nhập dựa trên trên email
  const user = await db.User.findOne({
    where: {
      email,
    },
    raw: true,
  });
  if (user) {
    // b2 : kiểm mật khẩu có đúng hay không
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      createSendToken(user, 201, res);
    } else {
      return next(new AppError("Incorrect email or password"), 401);
    }
  }
});

module.exports = { getAllUser, register, login };
