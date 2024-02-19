import { type Request, type Response } from "express";

export function fetchAllPreferences(req: Request, res: Response): void {
  if (req.user) {
    return res.status(200).send({ preferences: req.user.preferences });
  } else {
    return res.status(403).send({
      message: req.message,
    });
  }
}
