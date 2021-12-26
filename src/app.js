const express = require("express");
const app = express();

const config = require("./config");
const ApiError = require("./errors/ApiError");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/errorHandler");

const { recordRoutes } = require("./routes");

config();
loaders();

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send(`Welcome to Getir Final Task API by Necmettin Çakıcı.
  You can check github repo for introductions.
  https://github.com/getir-nodejs-bootcamp/getir-nodejs-bootcamp-graduation-project-necocakici`)
})
app.use("/api/records", recordRoutes);

//! not found
app.use((req, res, next) => {
  next(new ApiError(`There is no endpoint like ${req.path} for ${req.method} request.`, 404))
});
app.use(errorHandler);


app.listen(process.env.APP_PORT, () =>
  console.log(`App listening on port ${process.env.APP_PORT}!`)
);

module.exports = app