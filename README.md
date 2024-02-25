# Airtribe News Aggregation API


This project implements a secure and user-friendly news recommendation system using Node.js, Express.js, and TypeScript. It offers:

- *Registration and login*: Secure user authentication with bcrypt for password hashing and JWT for token-based authentication.

- *Personalized news*: User-defined preferences stored in a MongoDB database, used to filter news articles from multiple sources via external APIs.

- *RESTful API*: Endpoints for user registration, login, preference management, and personalized news retrieval.
*Robust error handling*: Catches and gracefully handles invalid requests, authentication errors, and authorization errors.

- *Validation and logging*: JOI schema validation for user input and morgan/winston for comprehensive logging.
Modular code: Well-organized structure for maintainability and scalability.
Key Learnings:

- *TypeScript*: Enhanced type safety, improved code structure, and better IDE support.

- *JOI*: Streamlined input validation, reducing errors and improving data integrity.

- *morgan and winston*: Detailed logging for debugging, monitoring, and troubleshooting.

- *Modular Code*: Organized project structure for easy collaboration and future enhancements.
MongoDB and mongoose: Efficient data storage and retrieval for user preferences.
dotenv and .env: Securely storing environment variables, improving configuration management.
Testing and Evaluation:

The API is thoroughly tested using Postman or Curl to ensure functionality, correctness, and resilience.
User feedback and performance analysis are used for continuous improvement.

### Prerequistes:
- NodeJS (v18 or newer)

### Installation:
- `npm install` - This will install all the dependencies of the application.
- create `.env` file in your project directory
- `npm dev` - This will start the application on port 8000.

### Running Tests:
- `npm test` 

### Routes:
- `POST` **/register**: Register a new user.
- `POST` **/login**: Log in a user.
- `GET` **/preferences**: Retrieve the news preferences for the logged-in user.
- `PUT` **/preferences**: Update the news preferences for the logged-in user.
- `GET` **/news**: Fetch news articles based on the logged-in user's preferences.

### Example `.env`:
```text
PORT=8000
NODE_ENV="test" || "development"
DATABASE_URI = "<MONGODB_URL>"
TEST_DATABASE_URI = "<MONGODB_URL>"
API_SECRET = "this-is-secret-not-to-be-disclosed-to-anyone"
PASSWORD_SALT = 8
NEWS_API_KEY = "<YOUR_NEWS_API_KEY_HERE>"
NEWS_API_URL = "https://newsapi.org/v2"
NEWS_API_COUNTRY = "in"
```
