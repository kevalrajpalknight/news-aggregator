const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initialize configuration
dotenv.config();

before("Test the DB Connectivity", (done) => {
  try {
    const database_uri = process.env.TEST_DATABASE_URI;
    mongoose.connect(database_uri);
    done();
  } catch (err) {
    console.error("Connection to the db failed");
  }
});

beforeEach("Drop the data from each collections", (done) => {
  try {
    mongoose.connection.collections.users?.drop(() => {
      done();
    });
  } catch (err) {
    console.error(err);
  }
});

afterEach("Drop the data from each collections", (done) => {
  try {
    mongoose.connection.collections.users?.drop(() => {
      done();
    });
  } catch (err) {
    console.error(err);
  }
});

after("Disconnecting with database", (done) => {
  mongoose.disconnect();
  done();
});
