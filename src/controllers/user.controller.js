const express = require("express");
const db = require("../models");
const getHomepage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getHomepage,
};
