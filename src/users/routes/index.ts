import { Router } from "express";
import { fetchAllPreferences } from "../controllers";

const router = Router();

router.get("/preferences", fetchAllPreferences);

export default router;
