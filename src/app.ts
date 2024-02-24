import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import newsRoute from "./news/routes";
import usersRoute from "./users/routes";
import Logger from "./utils/logger";
import morganMiddleware from "./utils/middleware/morganMiddleware";
import verifyToken from "./utils/middleware/verifyAuthToken";

// Initialize configuration
dotenv.config();

// Initialize express server configuration
const app = express();
const port = process.env["PORT"] || 8000;

// Express configuration
// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morganMiddleware);
app.use(express.json()); // Enable JSON body parser
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/users", usersRoute);
app.use("/news", verifyToken, newsRoute);

try {
  const database_uri =
    process.env.NODE_ENV == "test"
      ? process.env.TEST_DATABASE_URI
      : process.env.DATABASE_URI;
  if (!database_uri) {
    throw Error("Could not find the database URI");
  } else {
    mongoose.connect(database_uri);
    Logger.info("Connected to the db");
  }
} catch (err) {
  Logger.error(err.message);
}

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
module.exports = app;
