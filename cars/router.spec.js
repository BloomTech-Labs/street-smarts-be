const request = require("supertest");
const server = require("../server.js");

describe("GET /api/cars", () => {
    it("should return json type", async () => {
        const res = await request(server).get("/api/cars");
        expect(res.type).toBe("application/json");
    })
})