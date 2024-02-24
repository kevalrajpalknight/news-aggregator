const model = require("../../build/src/users/models/users");
const bcrypt = require("bcrypt");

const PASSWORD_SALT = process.env.PASSWORD_SALT
  ? parseInt(process.env["PASSWORD_SALT"])
  : 10;

let expect;
const User = model.default;

import("chai").then((chai) => {
  expect = chai.expect;
});

describe("Creating user", () => {
  it("Creates a new user successfuly", (done) => {
    const user = new User({
      name: "test",
      email: "test123@gmail.com",
      password: bcrypt.hashSync("test1234", PASSWORD_SALT),
      preferences: ["sport", "movies", "business"],
    });
    user
      .save()
      .then((user) => {
        expect(user.name).equal("test");
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it("Validates the email of the user and fail for incorrect email", (done) => {
    const user = new User({
      name: "test",
      email: "test@123@gmail.com",
      password: bcrypt.hashSync("test1234", PASSWORD_SALT),
    });
    user.save().catch((err) => {
      expect(err._message).equal("User validation failed");
      done();
    });
  });

  it("validates the uniqueness of the email", async (done) => {
    const user = new User({
      name: "test",
      email: "test123@gmail.com",
      password: bcrypt.hashSync("test1234", PASSWORD_SALT),
    });
    try {
      const initialUser = await user.save();
      console.log(initialUser);
      const anotherUser = new User({
        name: "test",
        email: "test123@gmail.com",
        password: bcrypt.hashSync("test1234", PASSWORD_SALT),
      });
      await anotherUser.save();
      console.log(anotherUser);
      throw new Error("Shouldn't save the user");
    } catch (err) {
      console.error(err);
      expect(err._message).equal("User validation failed");
      done();
    }
  });
});
