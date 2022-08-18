
const request = require("supertest");

const app = require("./app");

let { items } = require("./itemsDB");

const popsicle = { name: "popsicle", price: 1.45 };
const cheerios = { name: "cheerios", price: 3.40 };


beforeEach(function() {
items.push(popsicle,cheerios);
});

afterEach(function() {
items = [];
});


describe("GET /items", function() {
  it("Gets a list of items", async function() {

  const resp = await request(app).get(`/items`);
  debugger
  expect(resp.body).toEqual({"items": [{"name": "popsicle", "price": 1.45}, {"name": "cheerios", "price": 3.4}]});

  });
  });

