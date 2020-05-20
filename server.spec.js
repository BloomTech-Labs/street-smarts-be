const request = require("supertest");
const server = require("./server");
const db = require("./data/dbconfig.js");

describe("test server.js", () => {
  it(" should set the testing environment", () => {
    expect(true).toBe(true);
  });
});

it("Should return the following message", function () {
  return request(server)
    .get("/")
    .then((res) => {
      expect(res.body).toEqual({ message: "Server up and running" });
    });
});

describe("GET /", function () {
  it("Should return status of 200", function () {
    return request(server)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("Should return JSON", function () {
    return request(server)
      .get("/")
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });
});

describe("GET /api/model", function () {
  it("Should return status of 200 for model", (done) => {
    request(server).get("/api/model").expect(200, done);
  });
});

describe("GET /api/make", function () {
  it("Should return status of 200 for make", (done) => {
    request(server).get("/api/make").expect(200, done);
  });
});

describe("GET /api/year", function () {
  it("Should return status of 200 for year", (done) => {
    request(server).get("/api/year").expect(200, done);
  });
});
