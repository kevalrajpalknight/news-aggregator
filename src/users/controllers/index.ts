import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import User from "../../users/models/users";

const PASSWORD_SALT = process.env.PASSWORD_SALT
  ? parseInt(process.env["PASSWORD_SALT"])
  : 10;

export function signUp(req: Request, res: Response): void {
  const { name, email, password, preferences } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, PASSWORD_SALT),
    preferences: preferences,
  });

  user
    .save()
    .then((data) => {
      return res
        .status(200)
        .json({ user: data, message: "User created successfully" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
}

export function signIn(req: Request, res: Response): void {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      let passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(403).send({ message: "Invalid password" });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.API_SECRET,
          {
            expiresIn: 86400,
          },
        );

        return res.status(200).json({
          message: "Login Successful",
          token: token,
          user: {
            id: user.id,
          },
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
}

export function fetchAllPreferences(req: Request, res: Response): void {
  return res.status(200).send({ preferences: req.user.preferences });
}

export function updateUserPreferences(req: Request, res: Response): void {
  const preferences: Array<string> = req.body.preferences;
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      user.preferences = preferences;
      user.save();
      return res
        .status(200)
        .send({ message: "updated preferences", user: user });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
}
