import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Initialize configuration
dotenv.config();

// Initialize express server configuration
const app = express();
const port = process.env["PORT"] || 8000;

// Express configuration
// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morgan
app.use(express.json()); // Enable JSON body parser
app.use(express.urlencoded({ extended: true }));

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
module.exports = app;
