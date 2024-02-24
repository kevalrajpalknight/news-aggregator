import { type Request, type Response } from "express";

import { getTopHeadlines } from "../../utils/news/api";

export async function getTopNews(req: Request, res: Response): Response {
  if (!req.user)
    return res.status(401).send({
      message: "You must be logged in",
    });
  try {
    const response = await getTopHeadlines(req.user.preferences);
    return res.status(response?.status).send(response?.data || {});
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
}
