const request = require("supertest");
const server = require("../server.js");

const db = require("../data/dbconfig.js");

describe("POST /api/predict/carbon_emissions", () => {
    it("add car ID", async () => {
        const res = await request(server)
            .post("/api/predict/carbon_emissions/1");
            console.log(res.body);
        expect(res.status).toBe(200);
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

describe("POST /api/predict/price", () => {
    it("add car ID", async () => {
        const res = await request(server)
            .post("/api/predict/price/1")
        expect(res.status).toBe(200);
    })

    it("POST fail", async () => {
        const res = await request(server)
            .post("/api/predict/price/234")
        expect(res.status).toBe(404);
    })

    it("Returns in JSON format", async () => {
        const res = await request(server)
        .post("/api/predict/price/1")
        expect(res.type).toBe("application/json");
    })
})