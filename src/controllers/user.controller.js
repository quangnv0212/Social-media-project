const express = require("express");
const db = require("../models");
const getHomepage = (req, res) => {
  return res.render("crud-form.ejs");
};
module.exports = {
  getHomepage,
};
