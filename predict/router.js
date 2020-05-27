const express = require("express");
const axios = require("axios");

const Cars = require("../cars/model");

const router = express.Router();

const API =
  "http://streetsmarts-ds-labs24.eba-dsb2aeqx.us-east-1.elasticbeanstalk.com";

//POST /api/predict/carbon_emissions
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
            res.status(200).json({
              id,
              make: cars.id,
              model: cars.model,
              year: cars.year,
              predicted_carbon_emissions:
                carbon_emissions_prediction.data.predicted_co2_sql,
            });
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

//POST /api/predict/carbon_emissions
router.post("/carbon_emissions2", async (req, res) => {
  if (!req.body || !Array.isArray(req.body)) {
    console.log(req.body);
    res.status(400).json({ message: "list of car id's must be given" });
    return;
  }
  if (req.body.length > 10) {
    res.status(400).json({ message: "maximum number of car ids is 10" });
    return;
  }
  const queries = req.body.map(getPredictionForCar);

  const res_data = [];
  for (let query of queries) {
    res_data.push(await query);
  }

  res.status(200).json(res_data);
});

async function getPredictionForCar(id) {
  const carRes = await Cars.searchById(id)
    .then((car) => {
      if (car) {
        return { ok: car };
      } else {
        return {
          err: { error: "Could not find car with id", id, status: 404 },
        };
      }
    })
    .catch((err) => {
      return { err: { id, error: err, status: 500 } };
    });

  if (carRes.ok) {
    const car = carRes.ok;
    const prediction = await axios
      .post(
        `${API}/carbon_emissions2?make=${car.make}&model=${car.model}&year=${car.year}`
      )
      .then((carbon_emissions_prediction) => {
        return {
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          predicted_carbon_emissions:
            carbon_emissions_prediction.data.predicted_co2_sql,
          status: 200,
        };
      })
      .catch((err) => {
        console.log(err);
        return { id: car.id, message: "Failed to get prediction", status: 500 };
      });
    return prediction;
  } else if (carRes.err) {
    return carRes.err;
  }
}

module.exports = router;
