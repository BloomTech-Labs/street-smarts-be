const express = require("express");
const axios = require("axios");

const Cars = require("../cars/model");

const router = express.Router();

const API =
  "http://streetsmarts-ds-labs24.eba-dsb2aeqx.us-east-1.elasticbeanstalk.com";

//POST /api/cars/carbon_emissions
router.post("/carbon_emissions", (req, res) => {
  if (!req.query.car) {
    res.status(400).json({ message: "car query parameter must be defined" });
    return;
  }
  const id = req.query.car;

  Cars.searchById(id)
    .then((cars) => {
      if (cars) {
        axios
          .post(
            `${API}/carbon_emissions2?make=${cars.make}&model=${cars.model}&year=${cars.year}`
          )
          .then((carbon_emissions_prediction) => {
            res.status(200).json(carbon_emissions_prediction.data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Failed to get prediction" });
          });
      } else {
        console.log(cars);
        res.status(404).json({ message: "Couldn't find car with given ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get cars" });
    });
});

module.exports = router;
