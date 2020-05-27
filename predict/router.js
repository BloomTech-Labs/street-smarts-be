const express = require("express");
const axios = require("axios");

const Cars = require("../cars/model");

const router = express.Router();


const API =
  "http://streetsmarts-ds-labs24.eba-dsb2aeqx.us-east-1.elasticbeanstalk.com";

//POST /api/predict/carbon_emissions
router.post("/carbon_emissions/:id", getSinglePrediction("carbon_emissions2"));

//POST /api/predict/carbon_emissions
router.post("/price/:id", getSinglePrediction("price"));

//POST /api/predict/carbon_emissions
router.post("/carbon_emissions2", async (req, res) => {
  if (!req.body || !Array.isArray(req.body)) {
    console.log(req.body);
    res.status(400).json({
      message: "list of car id's must be given"
    });
    return;
  }
  if (req.body.length > 10) {
    res.status(400).json({
      message: "maximum number of car ids is 10"
    });
    return;
  }
  const queries = req.body.map(id => getPredictionForCar("carbon_emissions2", id));

  const res_data = [];
  for (let query of queries) {
    const predictionRes = await query;
    if (predictionRes.ok) {
      res_data.push(predictionRes.ok);
    } else {
      res_data.push(predictionRes.err);
    }
  }

  res.status(200).json(res_data);
});

function getSinglePrediction(endpoint) {
  return async function (req, res) {
    const { id } = req.params;

    const predictionRes = await getPredictionForCar(endpoint, id);
    if (predictionRes.ok) {
      delete predictionRes.ok.status;
      res.status(200).json(predictionRes.ok);
    } else {
      res.status(predictionRes.err.status).json(predictionRes.err);
    }
  }
}

async function getPredictionForCar(endpoint, id) {
  const carRes = await Cars.searchById(id)
    .then((car) => {
      if (car) {
        return {
          ok: car
        };
      } else {
        return {
          err: {
            error: "Could not find car with id",
            id,
            status: 404
          },
        };
      }
    })
    .catch((err) => {
      return {
        err: {
          id,
          error: err,
          status: 500
        }
      };
    });

  if (carRes.ok) {
    const car = carRes.ok;
    const prediction = await axios
      .post(
        `${API}/${endpoint}?make=${car.make}&model=${car.model}&year=${car.year}`
      )
      .then((prediction) => {
        return {
          ok: {
            id: car.id,
            make: car.make,
            model: car.model,
            year: car.year,
            predicted_carbon_emissions: prediction.data.predicted_co2_sql,
            predicted_price: prediction.data.predicted_price,
            status: 200,
          }
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          err: {
            id: car.id,
            message: "Failed to get prediction",
            status: 500
          }
        };
      });
    return prediction;
  } else if (carRes.err) {
    return carRes;
  }
}

module.exports = router;