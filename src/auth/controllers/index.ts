import bcrypt from "bcrypt";
import { type Request, type Response } from "express";

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
      return res.status(500).send({ message: err._message });
    });
}
