const request = require("supertest");
const server = require("../server.js");
const mockAxios = require("axios");

const db = require("../data/dbconfig.js");

describe("POST /api/predict/carbon_emissions", () => {
    const data = {
        predicted_co2_sql: 300,
    };

    it("add car ID", async () => {
        mockAxios.post.mockImplementationOnce(() => Promise.resolve({ status: 200, data }));
        const res = await request(server)
            .post("/api/predict/carbon_emissions/1");
            console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.predicted_carbon_emissions).toBe(data.predicted_co2_sql);
    })

    it("POST fail", async () => {
        const res = await request(server)
            .post("/api/predict/carbon_emissions/234");
        expect(res.status).toBe(404);
    })
    it("Returns in JSON format", async () => {
        const res = await request(server)
        .post("/api/predict/carbon_emissions/1")
        expect(res.type).toBe("application/json");
    })
})

describe("POST /api/predict/carbon_emissions2", () => {
    it("add car ID", async () => {
        const carbons = [1];
        const res = await request(server)
            .post("/api/predict/carbon_emissions2")
            .send(carbons)
        expect(res.status).toBe(200);
    })

    it("POST fail", async () => {
        const failure = [1283];
        const res = await request(server)
            .post("/api/predict/carbon_emissions2")
            .send(failure)
        expect(res.status).toBe(200);
        expect(res.body[0].status).toBe(404);
    })
    it("Returns in JSON format", async () => {
        const res = await request(server)
        .post("/api/predict/carbon_emissions2")
        .send([1])
        expect(res.type).toBe("application/json");
    })
})

describe("POST /api/predict", () => {
    it("should return a prediction for the car price", async () => {
        const data = {
          car_price_prediction: 2873.39,
          fuel_cost: 12500,
          maintenance_cost: 5000,
          five_year_cost_to_own: 20373.39,
          co2_five_year_kgs: 37029.17,
          number_of_trees_to_offset: 340
        };

        mockAxios.post.mockImplementationOnce(() => Promise.resolve({ status: 200, data }));
        const res = await request(server)
            .post("/api/predict/1")
        expect(res.status).toBe(200);
        expect(res.body.predicted_price).toBe(data.car_price_prediction);
    })

    it("POST fail", async () => {
        const res = await request(server)
            .post("/api/predict/234")
        expect(res.status).toBe(404);
    })

    it("Returns in JSON format", async () => {
        const res = await request(server)
        .post("/api/predict/1")
        expect(res.type).toBe("application/json");
    })
})
