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

app.use("/records", recordRoutes);

//! not found
app.use((req, res, next) => {
  next(new ApiError("There is no path like this.",404))
});
app.use(errorHandler);


app.listen(process.env.APP_PORT, () =>
  console.log(`Example app listening on port ${process.env.APP_PORT}!`)
);
