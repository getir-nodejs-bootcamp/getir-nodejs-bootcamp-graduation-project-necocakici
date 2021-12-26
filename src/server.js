const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const ApiError = require("./errors/ApiError");
const errorHandler = require("./middlewares/errorHandler");
const { recordRoutes } = require("./routes");

const createServer = () => {
    const app = express();
    app.use(cors())
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
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

    return app;
}

module.exports = { createServer }