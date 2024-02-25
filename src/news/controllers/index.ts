import { type Request, type Response } from "express";

import { getTopHeadlines } from "../../utils/news/api";

export async function getTopNews(req: Request, res: Response): Response {
  try {
    const data = await getTopHeadlines(req.user.preferences);
    return res.status(200).send({ news: data });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
}
