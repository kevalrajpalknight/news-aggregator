import { Router } from "express";
import { getTopNews } from "../controllers";

const router = Router();

router.get("/", getTopNews);

export default router;
