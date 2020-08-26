const app = require("../../app");
const supertest = require("supertest");
const expect = require("chai").expect;

let server, request, response;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

describe("GET /api/v1/books", () => {
  it("is expected to respond with status code 200", async () => {
    response = await request.get("/api/v1/books");
    expect(response.body).to.equal({
      books: [{ title: "Lord of the Rings: Fellowship of the Ring" }],
    });
  });
});
