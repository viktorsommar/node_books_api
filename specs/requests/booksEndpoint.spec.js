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
  const author = await factory.create("Author", {
    id: 1,
    firstName: "Adi",
    lastname: "Naik",
  });
  await factory.createMany("Book", 2, [
    { id: 100, title: "This is a factory title", AuthorId: author.id },
    {
      id: 101,
      title: "This is another book from factory",
      AuthorId: author.id,
    },
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
  beforeEach(async () => {
    response = await request.get("/api/v1/books/101");
  });
  it("is expected to respond with a single book with a title", async () => {
    expect(response.body.book.title).to.equal(
      "This is another book from factory"
    );
  });

  it("is expect to respond with an author", () => {
    expect(response.body.book.author.firstName).to.equal("Adi");
  });
});
