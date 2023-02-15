const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./config/connectDB");
const { rootRouter } = require("./route");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", rootRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
