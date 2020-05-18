const request = require("supertest");
const server = require("../server.js");

const db = require("../data/dbconfig.js");

describe("GET /api/cars", () => {
  const example_car = {
    id: 1,
    make: "Tesla",
    model: "X",
    year: 2018,
  };

  beforeEach(() => {
    return db("epa_vehicles_all")
      .truncate()
      .then(() => db("epa_vehicles_all").insert(example_car));
  });

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
        expect(res.body).toEqual(example_car);
      });
  });

  it("Should return status of 404", async () => {
    const res = await request(server).get("/api/cars/1337");
    expect(res.status).toBe(404);
  });
});
