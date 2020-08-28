const app = require("../../app");
const supertest = require("supertest");
const expect = require("chai").expect;
const { factory } = require("../helpers");

let server, request, response;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

beforeEach(async () => {
  await factory.createMany("Book", 2, [
    { id: 100, title: "This is a factory title" },
    { id: 101, title: "This is another book from factory" },
  ]);
});

afterEach(async () => {
  await factory.cleanUp();
});

describe("GET /api/v1/books", () => {
  beforeEach(async () => {
    response = await request.get("/api/v1/books");
  });

  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it("is expected to respond with list of books", () => {
    expect(response.body["books"].length).to.equal(2);
  });
});

describe("GET /api/v1/books/:id", () => {
  it("is expected to respond with a single book", async () => {
    response = await request.get("/api/v1/books/101");
    expect(response.body.book.title).to.equal("This is another book from factory");
  });
});
