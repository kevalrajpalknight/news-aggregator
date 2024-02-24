import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../users/models/users";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split("Bearer ")[1];
  if (token) {
    jwt.verify(token, process.env.API_SECRET, function (err, decode) {
      if (err) {
        const message: string = "Header verfy failed!";
        return res.status(403).send({ message });
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
            const message: string = err.message;
            return res.status(403).send({ message });
          });
      }
    });
  } else {
    req.user = undefined;
    const message: string = "Authorization header not found";
    return res.status(403).send({ message });
  }
};

export default verifyToken;
