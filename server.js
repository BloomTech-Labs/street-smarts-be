const express = require("express");
const cors = require("cors");

const Cars = require("./cars/model");
const carsRouter = require("./cars/router");
const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/cars", carsRouter);

server.get("/api/make", (req, res) => {
  let where = {};
  if (req.query.model) {
    where = { ...where, model: req.query.model };
  }
  if (req.query.year) {
    where = { ...where, year: req.query.year };
  }
  Cars.getMake(where)
    .then((make) => {
      res.status(200).json(make);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get make of car" });
    });
});

server.get("/api/year", (req, res) => {
  let where = {};
  if (req.query.make) {
    where = { ...where, make: req.query.make };
  }
  if (req.query.model) {
    where = { ...where, model: req.query.model };
  }
  Cars.getYears(where)
    .then((years) => {
      res.status(200).json(years);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get list of years" });
    });
});

server.get("/api/model", (req, res) => {
  let where = {};
  if (req.query.make) {
    where = { ...where, make: req.query.make };
  }
  if (req.query.year) {
    where = { ...where, year: req.query.year };
  }
  Cars.getModel(where)
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

module.exports = server;
