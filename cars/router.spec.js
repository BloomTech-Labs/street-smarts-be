const request = require("supertest");
const server = require("../server.js");
const { setupExampleData, EXAMPLE_CARS } = require("../testUtils.js");

describe("GET /api/cars", () => {
  beforeEach(setupExampleData);

  it("should return json type", async () => {
    const res = await request(server).get("/api/cars");
    expect(res.type).toBe("application/json");
  });

  it("Should return status of 200", async () => {
    const res = await request(server).get("/api/cars");
    expect(res.status).toBe(200);
  });

  it("Should return status of 200", async () => {
    return await request(server)
      .get("/api/cars/1")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(EXAMPLE_CARS[0]);
      });
  });

  it("Should return status of 404", async () => {
    const res = await request(server).get("/api/cars/1337");
    expect(res.status).toBe(404);
  });
});
