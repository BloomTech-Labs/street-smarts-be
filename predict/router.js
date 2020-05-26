const express = require("express");
const axios = require("axios");

const Cars = require("../cars/model");

const router = express.Router();

const API =
  "http://streetsmarts-ds-labs24.eba-dsb2aeqx.us-east-1.elasticbeanstalk.com";

//POST /api/predict/carbon_emissions
router.post("/carbon_emissions", async (req, res) => {
  if (!req.body || !Array.isArray(req.body)) {
    console.log(req.body);
    res.status(400).json({ message: "list of car id's must be given" });
    return;
  }
  if (req.body.length > 10) {
    res.status(400).json({ message: "maximum number of car ids is 10" });
    return;
  }
  const ids = req.body;

  const carQueries = [];
  for (let id of ids) {
    const carQuery = Cars.searchById(id)
      .then((car) => {
        if (car) {
          return { ok: car };
        } else {
          return { err: { error: "Could not find car with id", id } };
        }
      })
      .catch((err) => {
        return { err: { id, error: err } };
      });
    carQueries.push(carQuery);
  }

  const predictionQueries = [];
  for (let query of carQueries) {
    const carRes = await query;
    if (carRes.ok) {
      const car = carRes.ok;
      const predictionQuery = axios
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
          };
        })
        .catch((err) => {
          return { id: car.id, message: "Failed to get prediction" };
        });
      predictionQueries.push(predictionQuery);
    }
    if (carRes.err) {
      const func = async () => {
        return carRes.err;
      };
      predictionQueries.push(func());
    }
  }

  const res_data = [];
  for (let pred of predictionQueries) {
    res_data.push(await pred);
  }

  res.status(200).json(res_data);
});

module.exports = router;
