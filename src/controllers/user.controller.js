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
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
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
    console.log("isAuth : ", isAuth);
    if (isAuth) {
      // const token = jwt.sign(
      //   { email: user.email, type: user.type },
      //   "tuong-tinh-2350",
      //   { expiresIn: 60 * 60 }
      // );
      // res.status(200).send({ message: "Đăng Nhập Thành Công ! ", token });
      createSendToken(user, 201, res);
    } else {
      res.status(500).send({ message: "Tài khoãng hoặc mật khẩu không đúng" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email phù hợp" });
  }
};

module.exports = { getAllUser, register, login };
