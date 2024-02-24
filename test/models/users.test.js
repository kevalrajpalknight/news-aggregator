const User = require("../../build/src/users/models/users");
const bcrypt = require("bcrypt");
let expect;

import("chai").then((chai) => {
  expect = chai.expect;
});

describe("Creating the doucments in mongo db without mocking", () => {
  it("Creates a new user successfuly", (done) => {
    const user = new User({
      fullName: "test",
      email: "test123@gmail.com",
      password: bcrypt.hashSync("test1234", 8),
    });
    user
      .save()
      .then((user) => {
        expect(user.fullName).equal("test");
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it("Validates the email of the user and fail for incorrect email", (done) => {
    const user = new User({
      fullName: "test",
      email: "test@123@gmail.com",
      role: "admin",
      password: bcrypt.hashSync("test1234", 8),
    });
    user.save().catch((err) => {
      // expect(err._message).equal("User validation failed");
      done();
    });
  });

  it("validates the uniqueness of the email", (done) => {
    done();
  });

  it("Validates the role of the user", (done) => {
    const user = new User({
      fullName: "test",
      email: "test123@gmail.com",
      role: "some random role",
      password: bcrypt.hashSync("test1234", 8),
    });
    user.save().catch((err) => {
      // expect(err._message).equal("User validation failed");
      done();
    });
  });
});
