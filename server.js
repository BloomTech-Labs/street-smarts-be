const express = require("express");
const cors = require("cors");

const Cars = require("./cars/model");
const carsRouter = require("./cars/router");
const predictRouter = require("./predict/router");
const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/cars", carsRouter);
server.use("/api/predict", predictRouter);

server.get("/api/make", getQueryParameters, (req, res) => {
  Cars.getMake(req.queryParams)
    .then((make) => {
      res.status(200).json(make);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get make of car" });
    });
});

server.get("/api/year", getQueryParameters, (req, res) => {
  Cars.getYears(req.queryParams)
    .then((years) => {
      res.status(200).json(years);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get list of years" });
    });
});

server.get("/api/model", getQueryParameters, (req, res) => {
  Cars.getModel(req.queryParams)
    .then((models) => {
      res.status(200).json(models);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get car model" });
    });
});

server.get("/", (req, res) => {
  res.json({ message: "Server up and running" });
});

function getQueryParameters(req, res, next) {
  let where = {};
  if (req.query.make) where.make = req.query.make;
  if (req.query.model) where.model = req.query.model;
  if (req.query.year) where.year = req.query.year;

  req.queryParams = where;
  next();
}

module.exports = server;
