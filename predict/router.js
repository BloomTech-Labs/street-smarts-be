const express = require("express");

const router = express.Router();
const { getPredictionForCar, getSinglePrediction } = require('./model');

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


module.exports = router;