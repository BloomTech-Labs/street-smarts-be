const Cars = require("../cars/model");
const axios = require("axios");

module.exports = {
    getPredictionForCar,
    getSinglePrediction
}

const API =
  "http://streetsmarts-ds-labs24.eba-dsb2aeqx.us-east-1.elasticbeanstalk.com";

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


function getSinglePrediction(endpoint) {
    return async function (req, res) {
        const {
            id
        } = req.params;

        const predictionRes = await getPredictionForCar(endpoint, id);
        if (predictionRes.ok) {
            delete predictionRes.ok.status;
            res.status(200).json(predictionRes.ok);
        } else {
            res.status(predictionRes.err.status).json(predictionRes.err);
        }
    }
}