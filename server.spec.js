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

const example_cars = [
  {
    id: 1,
    make: "Tesla",
    model: "X",
    year: 2018,
  },
  {
    id: 2,
    make: "Ford",
    model: "F150",
    year: 2017,
  },
];

function testListEndpoint(endpoint, propName) {
  return function () {
    beforeEach(() => {
      return db("epa_vehicles_all")
        .truncate()
        .then(() => db("epa_vehicles_all").insert(example_cars));
    });

    it("Should return status of 200 for model", (done) => {
      request(server).get(endpoint).expect(200, done);
    });

    it("Should return list that is in alphabetical order", (done) => {
      request(server)
        .get(endpoint)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(isAlphabetical(res.body.map((i) => i[propName]))).toBe("yes");
          done();
        });
    });
  };
}

describe("GET /api/model", testListEndpoint("/api/model", "model"));
describe("GET /api/make", testListEndpoint("/api/make", "make"));
describe("GET /api/year", testListEndpoint("/api/year", "year"));

function isAlphabetical(array) {
  // Make sure it's an array that is longer than 1, so that we can avoid false positives
  // in the case that there is only one item in the list
  if (!Array.isArray(array)) {
    return "not an array";
  }
  if (array.length <= 1) {
    return "array is too short";
  }

  // check that each item is greater than the last
  let prev = array.shift();
  for (let next of array) {
    if (next <= prev) {
      return `${next} is not greater than ${prev}`;
    }
    prev = next;
  }

  return "yes";
}
