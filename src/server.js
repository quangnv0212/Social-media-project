const bodyParser = require("body-parser");
const express = require("express");
const connectDB = require("./config/connectDB");
const viewEngine = require("./config/viewEngine");
const { rootRouter } = require("./route");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
app.use("/api/v1", rootRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});
connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
