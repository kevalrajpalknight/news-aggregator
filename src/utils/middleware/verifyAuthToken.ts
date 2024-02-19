import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../users/models/users";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers?.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          req.message = "Header verification failed";
          next();
        } else {
          User.findOne({
            _id: decode.id,
          })
            .then((user) => {
              req.user = user;
              req.message = "Found the user successfully";
              next();
            })
            .catch((err) => {
              req.user = undefined;
              req.message = err.message;
              next();
            });
        }
      },
    );
  } else {
    req.user = undefined;
    req.message = "Authorization header not found";
    next();
  }
};

export default verifyToken;
